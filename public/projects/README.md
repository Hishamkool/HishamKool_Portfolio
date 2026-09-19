Drop a project's thumbnail image into its folder as `project_thumb.jpg`
(exactly that filename — jpg only).

Image priority per project card:
1. `public/projects/<slug>/project_thumb.jpg` (this folder)
2. A live screenshot fetched from the project's live URL, if one is set
3. The fallback stock image set in `src/App.tsx`

The `<slug>` for each project matches the `slug` field on that project in
`src/App.tsx`'s `projects` array (folder names already created for every
current project).
