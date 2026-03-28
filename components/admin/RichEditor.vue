<template>
  <div class="rich-editor-wrap">
    <!-- Toolbar -->
    <div v-if="editor" class="toolbar">
      <button type="button" @click="editor.chain().focus().toggleBold().run()" :class="{ active: editor.isActive('bold') }" title="Bold"><b>B</b></button>
      <button type="button" @click="editor.chain().focus().toggleItalic().run()" :class="{ active: editor.isActive('italic') }" title="Italic"><i>I</i></button>
      <button type="button" @click="editor.chain().focus().toggleUnderline().run()" :class="{ active: editor.isActive('underline') }" title="Underline"><u>U</u></button>
      <div class="sep" />
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ active: editor.isActive('heading', { level: 2 }) }" title="H2">H2</button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ active: editor.isActive('heading', { level: 3 }) }" title="H3">H3</button>
      <div class="sep" />
      <button type="button" @click="editor.chain().focus().toggleBulletList().run()" :class="{ active: editor.isActive('bulletList') }" title="Bullet list">
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M3 5h2v2H3V5zm0 4h2v2H3V9zm0 4h2v2H3v-2zm4-8h10v2H7V5zm0 4h10v2H7V9zm0 4h10v2H7v-2z"/></svg>
      </button>
      <button type="button" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ active: editor.isActive('orderedList') }" title="Ordered list">
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M3 5h1v1H3V5zm1 1V5h1v1H4zm-1 3h1v1H3V9zm1 1V9h1v1H4zm-1 3h1v1H3v-1zm1 1v-1h1v1H4zm3-9h10v2H7V5zm0 4h10v2H7V9zm0 4h10v2H7v-2z"/></svg>
      </button>
      <button type="button" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ active: editor.isActive('blockquote') }" title="Blockquote">"</button>
      <div class="sep" />
      <button type="button" @click="setLink" :class="{ active: editor.isActive('link') }" title="Link">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
      </button>
      <button type="button" @click="insertImageUrl" title="Image URL">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      </button>
      <div class="sep" />
      <button type="button" @click="editor.chain().focus().toggleCode().run()" :class="{ active: editor.isActive('code') }" title="Inline code"><code style="font-size:10px;">`c`</code></button>
      <button type="button" @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ active: editor.isActive('codeBlock') }" title="Code block">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
      </button>
      <div class="sep" />
      <button type="button" @click="editor.chain().focus().undo().run()" title="Undo">↩</button>
      <button type="button" @click="editor.chain().focus().redo().run()" title="Redo">↪</button>
    </div>
    <EditorContent :editor="editor" class="editor-content" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'

const props = defineProps<{ modelValue: string; placeholder?: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const editor = useEditor({
  content: props.modelValue || '',
  extensions: [
    StarterKit,
    Underline,
    Link.configure({ openOnClick: false }),
    Image,
    Placeholder.configure({ placeholder: props.placeholder || 'Write your content…' }),
  ],
  onUpdate: ({ editor }) => emit('update:modelValue', editor.getHTML()),
})

watch(() => props.modelValue, (val) => {
  if (editor.value && editor.value.getHTML() !== val) {
    editor.value.commands.setContent(val || '', false)
  }
})

onBeforeUnmount(() => editor.value?.destroy())

function setLink() {
  const prev = editor.value?.getAttributes('link').href || ''
  const url = prompt('URL:', prev)
  if (url === null) return
  if (url === '') {
    editor.value?.chain().focus().unsetLink().run()
  } else {
    editor.value?.chain().focus().setLink({ href: url }).run()
  }
}

function insertImageUrl() {
  const url = prompt('Image URL:')
  if (url) editor.value?.chain().focus().setImage({ src: url }).run()
}
</script>

<style scoped>
.rich-editor-wrap {
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 0.75rem;
  overflow: hidden;
  background: rgba(255,255,255,0.03);
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  padding: 6px 8px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.04);
}
.toolbar button {
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 12px;
  color: rgba(255,255,255,0.6);
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 26px;
}
.toolbar button:hover { background: rgba(255,255,255,0.1); color: white; }
.toolbar button.active { background: rgba(122,158,126,0.25); color: #B3EFB2; }
.sep { width: 1px; background: rgba(255,255,255,0.1); margin: 2px 3px; align-self: stretch; }
</style>

<style>
.editor-content .tiptap {
  padding: 1rem;
  min-height: 300px;
  color: #e2e8f0;
  font-size: 0.9375rem;
  line-height: 1.75;
  outline: none;
}
.editor-content .tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  color: rgba(255,255,255,0.25);
  pointer-events: none;
  float: left;
  height: 0;
}
.editor-content .tiptap h2 { font-size: 1.4rem; font-weight: 700; margin: 1.2rem 0 0.6rem; color: white; }
.editor-content .tiptap h3 { font-size: 1.15rem; font-weight: 600; margin: 1rem 0 0.5rem; color: white; }
.editor-content .tiptap ul, .editor-content .tiptap ol { padding-left: 1.5rem; margin: 0.5rem 0; }
.editor-content .tiptap li { margin: 0.25rem 0; color: rgba(226,232,240,0.85); }
.editor-content .tiptap blockquote { border-left: 3px solid #7A9E7E; padding-left: 1rem; color: rgba(255,255,255,0.6); margin: 1rem 0; }
.editor-content .tiptap a { color: #B3EFB2; text-decoration: underline; }
.editor-content .tiptap code { background: rgba(255,255,255,0.1); border-radius: 4px; padding: 2px 6px; font-size: 0.875em; }
.editor-content .tiptap pre { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; margin: 1rem 0; overflow-x: auto; }
.editor-content .tiptap pre code { background: none; padding: 0; }
.editor-content .tiptap img { max-width: 100%; border-radius: 8px; margin: 0.5rem 0; }
</style>
