import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { normalizePortfolioContent } from '../data/portfolioContent';

const sections = [
   { id: 'profile', label: 'Profile' },
   { id: 'expertise', label: 'Expertise' },
   { id: 'experience', label: 'Experience' },
   { id: 'projects', label: 'Projects' },
   { id: 'contact', label: 'Contact & links' },
];

const collectionFields = {
   expertise: [
      { key: 'title', label: 'Expertise title' },
      { key: 'level', label: 'Level (%)', type: 'number', min: 0, max: 100 },
      { key: 'desc', label: 'Description', multiline: true },
   ],
   experience: [
      { key: 'role', label: 'Role' },
      { key: 'company', label: 'Company' },
      { key: 'period', label: 'Dates' },
      { key: 'location', label: 'Location' },
      { key: 'description', label: 'Description', multiline: true },
      { key: 'link', label: 'Link', type: 'url' },
   ],
   projects: [
      { key: 'title', label: 'Project title' },
      { key: 'tech', label: 'Technologies' },
      { key: 'desc', label: 'Description', multiline: true },
      { key: 'name', label: 'Display name' },
      { key: 'link', label: 'Project link', type: 'url' },
   ],
   socialLinks: [
      { key: 'label', label: 'Name' },
      { key: 'url', label: 'Link', type: 'url' },
   ],
};

const newItems = {
   expertise: { title: '', level: 80, desc: '', icon: 'layout' },
   experience: {
      role: '',
      company: '',
      period: '',
      location: '',
      description: '',
      link: '',
   },
   projects: { title: '', tech: '', desc: '', name: '', link: '' },
   socialLinks: { label: '', url: '' },
};

function Field({ label, value, onChange, multiline = false, ...inputProps }) {
   const className =
      'w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-700 focus:ring-2 focus:ring-stone-300';
   return (
      <label className="block space-y-1 text-sm font-medium text-stone-700">
         <span>{label}</span>
         {multiline ? (
            <textarea
               className={`${className} min-h-24 resize-y`}
               value={value ?? ''}
               onChange={onChange}
            />
         ) : (
            <input
               className={className}
               value={value ?? ''}
               onChange={onChange}
               {...inputProps}
            />
         )}
      </label>
   );
}

function CollectionEditor({
   title,
   items,
   fields,
   onAdd,
   onRemove,
   onChange,
   addLabel,
}) {
   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
            <button
               type="button"
               onClick={onAdd}
               className="rounded-full border border-stone-400 px-4 py-2 text-sm hover:bg-stone-100">
               {addLabel}
            </button>
         </div>
         {items.length === 0 && (
            <p className="rounded-lg bg-stone-100 p-4 text-sm text-stone-600">
               Nothing added yet.
            </p>
         )}
         {items.map((item, index) => (
            <fieldset
               key={`${title}-${index}`}
               className="space-y-3 rounded-xl border border-stone-200 p-4">
               <legend className="px-2 text-sm font-semibold text-stone-600">
                  {title} {index + 1}
               </legend>
               <div className="grid gap-3 sm:grid-cols-2">
                  {fields.map((field) => (
                     <Field
                        key={field.key}
                        {...field}
                        value={item[field.key]}
                        onChange={(event) =>
                           onChange(index, field.key, event.target.value)
                        }
                     />
                  ))}
               </div>
               <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="text-sm font-medium text-red-700 hover:underline">
                  Remove
               </button>
            </fieldset>
         ))}
      </div>
   );
}

export default function PortfolioEditor({ content, onClose, onSaved }) {
   const [draft, setDraft] = useState(() => normalizePortfolioContent(content));
   const [activeSection, setActiveSection] = useState('profile');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isAdmin, setIsAdmin] = useState(false);
   const [isCheckingSession, setIsCheckingSession] = useState(true);
   const [isBusy, setIsBusy] = useState(false);
   const [error, setError] = useState('');
   const [message, setMessage] = useState('');

   useEffect(() => {
      let isMounted = true;

      const checkSession = async () => {
         if (!supabase) {
            setIsCheckingSession(false);
            return;
         }
         const { data, error: sessionError } = await supabase.auth.getSession();
         if (sessionError) {
            if (isMounted) setError(sessionError.message);
            if (isMounted) setIsCheckingSession(false);
            return;
         }
         if (data.session) {
            const { data: admin, error: adminError } = await supabase.rpc(
               'is_portfolio_admin',
            );
            if (isMounted && !adminError && admin === true) setIsAdmin(true);
            if (isMounted && adminError) setError(adminError.message);
         }
         if (isMounted) setIsCheckingSession(false);
      };

      checkSession();
      return () => {
         isMounted = false;
      };
   }, []);

   const signIn = async (event) => {
      event.preventDefault();
      if (!supabase) return;
      setIsBusy(true);
      setError('');
      setMessage('');
      const { error: signInError } = await supabase.auth.signInWithPassword({
         email,
         password,
      });
      if (signInError) {
         setError(signInError.message);
         setIsBusy(false);
         return;
      }
      const { data: admin, error: adminError } = await supabase.rpc(
         'is_portfolio_admin',
      );
      if (adminError) {
         setError(adminError.message);
         await supabase.auth.signOut();
      } else if (!admin) {
         setError('This account is not authorized to edit this portfolio.');
         await supabase.auth.signOut();
      } else {
         setIsAdmin(true);
         setPassword('');
      }
      setIsBusy(false);
   };

   const signOut = async () => {
      if (!supabase) return;
      setIsBusy(true);
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
         setError(signOutError.message);
      } else {
         setIsAdmin(false);
         setMessage('');
         setError('');
      }
      setIsBusy(false);
   };

   const setSectionValue = (section, key, value) => {
      setDraft((current) => ({
         ...current,
         [section]: { ...current[section], [key]: value },
      }));
   };

   const updateCollectionItem = (section, key, index, field, value) => {
      setDraft((current) => ({
         ...current,
         [section]: {
            ...current[section],
            [key]: current[section][key].map((item, itemIndex) =>
               itemIndex === index ? { ...item, [field]: value } : item,
            ),
         },
      }));
   };

   const addCollectionItem = (section, key) => {
      setDraft((current) => ({
         ...current,
         [section]: {
            ...current[section],
            [key]: [...current[section][key], { ...newItems[key] }],
         },
      }));
   };

   const removeCollectionItem = (section, key, index) => {
      setDraft((current) => ({
         ...current,
         [section]: {
            ...current[section],
            [key]: current[section][key].filter(
               (_, itemIndex) => itemIndex !== index,
            ),
         },
      }));
   };

   const uploadPortrait = async (event) => {
      const file = event.target.files?.[0];
      event.target.value = '';
      if (!file || !supabase) return;
      if (!file.type.startsWith('image/')) {
         setError('Choose an image file.');
         return;
      }
      if (file.size > 8 * 1024 * 1024) {
         setError('The image must be 8 MB or smaller.');
         return;
      }

      setIsBusy(true);
      setError('');
      setMessage('');
      const extension = file.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '');
      const filePath = `portrait/${crypto.randomUUID()}.${extension || 'image'}`;
      const { error: uploadError } = await supabase.storage
         .from('portfolio-images')
         .upload(filePath, file, { contentType: file.type, upsert: false });

      if (uploadError) {
         setError(uploadError.message);
      } else {
         const { data } = supabase.storage
            .from('portfolio-images')
            .getPublicUrl(filePath);
         setSectionValue('profile', 'imageUrl', data.publicUrl);
         setMessage('Image uploaded. Save changes to publish it.');
      }
      setIsBusy(false);
   };

   const save = async (event) => {
      event.preventDefault();
      if (!supabase || !isAdmin) return;
      setIsBusy(true);
      setError('');
      setMessage('');
      const normalized = normalizePortfolioContent(draft);
      const { error: saveError } = await supabase
         .from('portfolio_content')
         .upsert({ id: 'main', content: normalized }, { onConflict: 'id' });

      if (saveError) {
         setError(saveError.message);
      } else {
         setDraft(normalized);
         onSaved(normalized);
         setMessage('Portfolio changes saved and published.');
      }
      setIsBusy(false);
   };

   const renderProfile = () => (
      <div className="space-y-4">
         <Field
            label="Greeting"
            value={draft.profile.greeting}
            onChange={(event) =>
               setSectionValue('profile', 'greeting', event.target.value)
            }
         />
         <Field
            label="Name"
            value={draft.profile.name}
            onChange={(event) =>
               setSectionValue('profile', 'name', event.target.value)
            }
         />
         <div className="grid gap-4 sm:grid-cols-2">
            <Field
               label="First title line"
               value={draft.profile.titleLine1}
               onChange={(event) =>
                  setSectionValue('profile', 'titleLine1', event.target.value)
               }
            />
            <Field
               label="Second title line"
               value={draft.profile.titleLine2}
               onChange={(event) =>
                  setSectionValue('profile', 'titleLine2', event.target.value)
               }
            />
         </div>
         <Field
            label="Introduction"
            multiline
            value={draft.profile.intro}
            onChange={(event) =>
               setSectionValue('profile', 'intro', event.target.value)
            }
         />
         <Field
            label="Portrait image URL"
            type="url"
            value={draft.profile.imageUrl}
            onChange={(event) =>
               setSectionValue('profile', 'imageUrl', event.target.value)
            }
         />
         <label className="block space-y-2 text-sm font-medium text-stone-700">
            <span>Or upload a portrait (8 MB max)</span>
            <input
               type="file"
               accept="image/*"
               disabled={isBusy}
               onChange={uploadPortrait}
               className="block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-stone-900 file:px-4 file:py-2 file:text-white"
            />
         </label>
         {draft.profile.imageUrl && (
            <img
               src={draft.profile.imageUrl}
               alt="Portrait preview"
               className="h-36 w-36 rounded-2xl object-cover"
            />
         )}
      </div>
   );

   const renderSection = () => {
      if (activeSection === 'profile') return renderProfile();
      if (activeSection === 'expertise') {
         return (
            <div className="space-y-5">
               <Field
                  label="Section heading"
                  value={draft.expertise.heading}
                  onChange={(event) =>
                     setSectionValue('expertise', 'heading', event.target.value)
                  }
               />
               <Field
                  label="Section introduction"
                  multiline
                  value={draft.expertise.intro}
                  onChange={(event) =>
                     setSectionValue('expertise', 'intro', event.target.value)
                  }
               />
               <CollectionEditor
                  title="Expertise"
                  addLabel="Add expertise"
                  items={draft.expertise.items}
                  fields={collectionFields.expertise}
                  onAdd={() => addCollectionItem('expertise', 'items')}
                  onRemove={(index) =>
                     removeCollectionItem('expertise', 'items', index)
                  }
                  onChange={(index, field, value) =>
                     updateCollectionItem(
                        'expertise',
                        'items',
                        index,
                        field,
                        field === 'level' ? Number(value) : value,
                     )
                  }
               />
            </div>
         );
      }
      if (activeSection === 'experience') {
         return (
            <div className="space-y-5">
               <Field
                  label="Section heading"
                  value={draft.experience.heading}
                  onChange={(event) =>
                     setSectionValue('experience', 'heading', event.target.value)
                  }
               />
               <CollectionEditor
                  title="Work experience"
                  addLabel="Add experience"
                  items={draft.experience.items}
                  fields={collectionFields.experience}
                  onAdd={() => addCollectionItem('experience', 'items')}
                  onRemove={(index) =>
                     removeCollectionItem('experience', 'items', index)
                  }
                  onChange={(index, field, value) =>
                     updateCollectionItem(
                        'experience',
                        'items',
                        index,
                        field,
                        value,
                     )
                  }
               />
            </div>
         );
      }
      if (activeSection === 'projects') {
         return (
            <div className="space-y-5">
               <Field
                  label="Section heading"
                  value={draft.projects.heading}
                  onChange={(event) =>
                     setSectionValue('projects', 'heading', event.target.value)
                  }
               />
               <CollectionEditor
                  title="Projects"
                  addLabel="Add project"
                  items={draft.projects.items}
                  fields={collectionFields.projects}
                  onAdd={() => addCollectionItem('projects', 'items')}
                  onRemove={(index) =>
                     removeCollectionItem('projects', 'items', index)
                  }
                  onChange={(index, field, value) =>
                     updateCollectionItem('projects', 'items', index, field, value)
                  }
               />
            </div>
         );
      }
      return (
         <div className="space-y-4">
            <Field
               label="Contact section heading"
               value={draft.contact.heading}
               onChange={(event) =>
                  setSectionValue('contact', 'heading', event.target.value)
               }
            />
            <div className="grid gap-4 sm:grid-cols-3">
               {['line1', 'line2', 'line3'].map((key, index) => (
                  <Field
                     key={key}
                     label={`Contact title line ${index + 1}`}
                     value={draft.contact[key]}
                     onChange={(event) =>
                        setSectionValue('contact', key, event.target.value)
                     }
                  />
               ))}
            </div>
            <Field
               label="Location"
               value={draft.contact.location}
               onChange={(event) =>
                  setSectionValue('contact', 'location', event.target.value)
               }
            />
            <Field
               label="Email address"
               type="email"
               value={draft.contact.email}
               onChange={(event) =>
                  setSectionValue('contact', 'email', event.target.value)
               }
            />
            <CollectionEditor
               title="Social and contact links"
               addLabel="Add link"
               items={draft.contact.socialLinks}
               fields={collectionFields.socialLinks}
               onAdd={() => addCollectionItem('contact', 'socialLinks')}
               onRemove={(index) =>
                  removeCollectionItem('contact', 'socialLinks', index)
               }
               onChange={(index, field, value) =>
                  updateCollectionItem(
                     'contact',
                     'socialLinks',
                     index,
                     field,
                     value,
                  )
               }
            />
         </div>
      );
   };

   return (
      <div
         className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/70 p-3 sm:p-6"
         role="presentation"
         onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
         }}>
         <section
            aria-label="Portfolio editor"
            aria-modal="true"
            role="dialog"
            className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-[#EBE9E4] shadow-2xl">
            <header className="flex items-center justify-between border-b border-stone-300 px-5 py-4">
               <div>
                  <h2 className="text-xl font-semibold text-stone-900">
                     Portfolio editor
                  </h2>
                  <p className="text-sm text-stone-600">
                     Changes are published for all visitors.
                  </p>
               </div>
               <div className="flex items-center gap-3">
                  {isAdmin && (
                     <button
                        type="button"
                        disabled={isBusy}
                        onClick={signOut}
                        className="text-sm font-medium text-stone-700 hover:underline">
                        Sign out
                     </button>
                  )}
                  <button
                     type="button"
                     onClick={onClose}
                     aria-label="Close editor"
                     className="rounded-full px-3 py-1 text-xl text-stone-600 hover:bg-stone-200">
                     ×
                  </button>
               </div>
            </header>

            {!isSupabaseConfigured ? (
               <div className="m-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
                  Supabase is not configured. Add the project URL and anon key
                  to <code>.env.local</code>, run the SQL setup, and restart the
                  development server.
               </div>
            ) : isCheckingSession ? (
               <p className="p-6 text-sm text-stone-600">Checking sign-in…</p>
            ) : !isAdmin ? (
               <form onSubmit={signIn} className="mx-auto w-full max-w-md space-y-4 p-6">
                  <p className="text-sm text-stone-600">
                     Sign in with the administrator account configured in
                     Supabase.
                  </p>
                  <Field
                     label="Email"
                     type="email"
                     autoComplete="username"
                     required
                     value={email}
                     onChange={(event) => setEmail(event.target.value)}
                  />
                  <Field
                     label="Password"
                     type="password"
                     autoComplete="current-password"
                     required
                     value={password}
                     onChange={(event) => setPassword(event.target.value)}
                  />
                  {error && (
                     <p role="alert" className="text-sm text-red-700">
                        {error}
                     </p>
                  )}
                  <button
                     type="submit"
                     disabled={isBusy}
                     className="w-full rounded-full bg-stone-900 px-5 py-3 font-semibold text-white disabled:opacity-50">
                     {isBusy ? 'Signing in…' : 'Sign in'}
                  </button>
               </form>
            ) : (
               <form onSubmit={save} className="flex min-h-0 flex-1 flex-col">
                  <div className="grid min-h-0 flex-1 md:grid-cols-[190px_1fr]">
                     <nav
                        aria-label="Editable portfolio sections"
                        className="flex gap-2 overflow-x-auto border-b border-stone-300 p-3 md:flex-col md:border-b-0 md:border-r">
                        {sections.map((section) => (
                           <button
                              type="button"
                              key={section.id}
                              onClick={() => setActiveSection(section.id)}
                              className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm ${activeSection === section.id ? 'bg-stone-900 text-white' : 'hover:bg-stone-200'}`}>
                              {section.label}
                           </button>
                        ))}
                     </nav>
                     <div className="min-h-0 overflow-y-auto p-4 sm:p-6">
                        <h3 className="mb-5 text-2xl font-serif text-stone-900">
                           {sections.find((section) => section.id === activeSection)?.label}
                        </h3>
                        {renderSection()}
                     </div>
                  </div>
                  <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-300 px-5 py-4">
                     <div aria-live="polite" className="text-sm">
                        {error && (
                           <span role="alert" className="text-red-700">
                              {error}
                           </span>
                        )}
                        {!error && message && (
                           <span className="text-green-800">{message}</span>
                        )}
                     </div>
                     <button
                        type="submit"
                        disabled={isBusy}
                        className="rounded-full bg-stone-900 px-6 py-3 font-semibold text-white disabled:opacity-50">
                        {isBusy ? 'Saving…' : 'Save and publish'}
                     </button>
                  </footer>
               </form>
            )}
            {!isAdmin && error && isSupabaseConfigured && !isCheckingSession && (
               <p role="alert" className="px-6 pb-5 text-sm text-red-700">
                  {error}
               </p>
            )}
         </section>
      </div>
   );
}
