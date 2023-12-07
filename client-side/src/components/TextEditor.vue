<template>
    <div class="text-editor-container">
      <div class="editor-toolbar" v-if="editor">
  <select v-model="selectedHeading" @change="handleHeadingChange">
    <option value="paragraph">Paragraph</option>
    <option value="heading" v-for="level in headingLevels" :key="level">
      Heading {{ level }}
    </option>
  </select>
  <!-- Other buttons can be added here if needed -->
  <button
    v-for="item in items"
    :key="item.title"
    @click="handleButtonClick(item)"
    :class="{ 'is-active': item.isActive && item.isActive() }"
  >
    {{ item.title }}
  </button>
</div>
      <editor-content class="editor" v-if="editor" :editor="editor" @keydown.tab.prevent="handleTab" />
    </div>
  </template>
  
  <script>
  import StarterKit from '@tiptap/starter-kit'
  import { Editor, EditorContent } from '@tiptap/vue-3'
  
  export default {
    components: {
      EditorContent,
    },
  
    props: {
      modelValue: {
        type: String,
        default: '',
      },
    },
  
    emits: ['update:modelValue'],
  
    data() {
      return {
        editor: null,
        selectedHeading: 'paragraph', // Default to paragraph
        headingLevels: [1, 2, 3, 4, 5, 6],
        items: [
				{
					icon: 'bold',
					title: 'Bold',
					action: () => this.editor.chain().focus().toggleBold().run(),
					isActive: () => this.editor.isActive('bold'),
				},
				{
					icon: 'italic',
					title: 'Italic',
					action: () => this.editor.chain().focus().toggleItalic().run(),
					isActive: () => this.editor.isActive('italic'),
				},
				{
					icon: 'strikethrough',
					title: 'Strike',
					action: () => this.editor.chain().focus().toggleStrike().run(),
					isActive: () => this.editor.isActive('strike'),
				},
				{
					icon: 'code-view',
					title: 'Code',
					action: () => this.editor.chain().focus().toggleCode().run(),
					isActive: () => this.editor.isActive('code'),
				},
				{
					icon: 'mark-pen-line',
					title: 'Highlight',
					action: () => this.editor.chain().focus().toggleHighlight().run(),
					isActive: () => this.editor.isActive('highlight'),
				},
				{
					type: 'divider',
				},
				{
					icon: 'h-1',
					title: 'Heading 1',
					action: () => this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
					isActive: () => this.editor.isActive('heading', { level: 1 }),
				},
				{
					icon: 'h-2',
					title: 'Heading 2',
					action: () => this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
					isActive: () => this.editor.isActive('heading', { level: 2 }),
				},
				// add H3
				{
					icon: 'h-3',
					title: 'Heading 3',
					action: () => this.editor.chain().focus().toggleHeading({ level: 3 }).run(),
					isActive: () => this.editor.isActive('heading', { level: 3 }),
				},
				{
					icon: 'paragraph',
					title: 'Paragraph',
					action: () => this.editor.chain().focus().setParagraph().run(),
					isActive: () => this.editor.isActive('paragraph'),
				},
				{
					icon: 'list-unordered',
					title: 'Bullet List',
					action: () => this.editor.chain().focus().toggleBulletList().run(),
					isActive: () => this.editor.isActive('bulletList'),
				},
				{
					icon: 'list-ordered',
					title: 'Ordered List',
					action: () => this.editor.chain().focus().toggleOrderedList().run(),
					isActive: () => this.editor.isActive('orderedList'),
				},
				{
					icon: 'list-check-2',
					title: 'Task List',
					action: () => this.editor.chain().focus().toggleTaskList().run(),
					isActive: () => this.editor.isActive('taskList'),
				},
				{
					icon: 'code-box-line',
					title: 'Code Block',
					action: () => this.editor.chain().focus().toggleCodeBlock().run(),
					isActive: () => this.editor.isActive('codeBlock'),
				},
				{
					type: 'divider',
				},
				{
					icon: 'double-quotes-l',
					title: 'Blockquote',
					action: () => this.editor.chain().focus().toggleBlockquote().run(),
					isActive: () => this.editor.isActive('blockquote'),
				},
				{
					icon: 'separator',
					title: 'Horizontal Rule',
					action: () => this.editor.chain().focus().setHorizontalRule().run(),
				},
				{
					type: 'divider',
				},
				{
					icon: 'text-wrap',
					title: 'Hard Break',
					action: () => this.editor.chain().focus().setHardBreak().run(),
				},
				{
					icon: 'format-clear',
					title: 'Clear Format',
					action: () => this.editor.chain()
						.focus()
						.clearNodes()
						.unsetAllMarks()
						.run(),
				},
				{
					type: 'divider',
				},
				{
					icon: 'arrow-go-back-line',
					title: 'Undo',
					action: () => this.editor.chain().focus().undo().run(),
				},
				{
					icon: 'arrow-go-forward-line',
					title: 'Redo',
					action: () => this.editor.chain().focus().redo().run(),
				},
        {
    icon: 'align-left',
    title: 'Align Left',
    action: () => this.editor.chain().focus().setTextAlign('left').run(),
    isActive: () => this.editor.isActive('textAlign', { align: 'left' }),
  },
  {
    icon: 'align-center',
    title: 'Align Center',
    action: () => this.editor.chain().focus().setTextAlign('center').run(),
    isActive: () => this.editor.isActive('textAlign', { align: 'center' }),
  },
  {
    icon: 'align-right',
    title: 'Align Right',
    action: () => this.editor.chain().focus().setTextAlign('right').run(),
    isActive: () => this.editor.isActive('textAlign', { align: 'right' }),
  },
  {
    icon: 'align-justify',
    title: 'Justify',
    action: () => this.editor.chain().focus().setTextAlign('justify').run(),
    isActive: () => this.editor.isActive('textAlign', { align: 'justify' }),
  },
			],
      };
    },
  
    methods: {

        increaseEditorHeight() {
      const currentHeight = parseInt(
        window.getComputedStyle(this.$el).getPropertyValue('height')
      );
      const newHeight = currentHeight + 100; // Increase the height by 100px or adjust as needed
      this.$el.style.height = `${newHeight}px`;
    },

        handleButtonClick(item) {
      if (item.action) {
        item.action();
      }
    },

    handleHeadingChange() {
      if (this.selectedHeading === 'paragraph') {
        this.editor.chain().focus().setParagraph().run();
      } else {
        const level = parseInt(this.selectedHeading);
        this.editor.chain().focus().toggleHeading({ level }).run();
      }
    },
        handleTab(event) {
      // Insert a newline character at the current cursor position
      this.editor.chain().focus().insertText('\n').run();

      // Prevent the default behavior of the Tab key (e.g., moving focus)
      event.preventDefault();
    },
      toggleBold() {
        this.editor.chain().focus().toggleBold().run();
      },
      toggleItalic() {
        this.editor.chain().focus().toggleItalic().run();
      },
      toggleStrike() {
        this.editor.chain().focus().toggleStrike().run();
      },
      toggleCode() {
        this.editor.chain().focus().toggleCode().run();
      },
      toggleHighlight() {
        this.editor.chain().focus().toggleHighlight().run();
      },
      toggleColor() {
        const color = prompt('Enter a color (e.g., red):');
        if (color) {
          this.editor.chain().focus().setTextColor(color).run();
        }
      },
      toggleHeading(level) {
        this.editor.chain().focus().toggleHeading({ level }).run();
      },
      toggleBulletList() {
        this.editor.chain().focus().toggleBulletList().run();
      },
      toggleOrderedList() {
        this.editor.chain().focus().toggleOrderedList().run();
      },
      toggleTaskList() {
        this.editor.chain().focus().toggleTaskList().run();
      },
      toggleCodeBlock() {
        this.editor.chain().focus().toggleCodeBlock().run();
      },
      toggleDoubleQuotes() {
        this.editor.chain().focus().toggleDoubleQuotes().run();
      },
      clearFormat() {
        this.editor.chain().focus().clearFormat().run();
      },
      undo() {
        if (this.editor.can().chain().focus().undo().run()) {
          this.$emit('update:modelValue', this.editor.getHTML());
        }
      },
      redo() {
        if (this.editor.can().chain().focus().redo().run()) {
          this.$emit('update:modelValue', this.editor.getHTML());
        }
      },
      setTextAlign(align) {
        this.editor.chain().focus().setTextAlign(align).run();
      },
    },
  
    watch: {
      modelValue(value) {
        const isSame = this.editor.getHTML() === value;
  
        if (!isSame) {
          this.editor.commands.setContent(value, false);
        }
      },
    },
  
    mounted() {
      this.editor = new Editor({
        extensions: [
          StarterKit,
          // Add other necessary extensions here
        ],
        content: this.modelValue,
        onUpdate: () => {
          this.$emit('update:modelValue', this.editor.getHTML());
        },
      });
    },
  
    beforeUnmount() {
      this.editor.destroy();
    },
  };
  </script>
  
  <style scoped>

.text-editor-container {
  background-color: #001f3f;
  color: #ffffff;
  padding: 10px;
  text-align: left;
  height: 800px;
  overflow-y: auto;
  display: flex; /* Use flexbox for layout */
  flex-direction: column; /* Stack child elements vertically */
}

.editor-toolbar {
  position: sticky;
  top: 0;
  z-index: 1000; /* Adjust the z-index as needed */
  background-color: #001f3f; /* Use the same background color as the container */
  color: #ffffff;
  margin-bottom: 10px;
}


.editor-toolbar button {
  background-color: #333333;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
}

.editor-toolbar button.active {
  background-color: #555555;
}

</style>