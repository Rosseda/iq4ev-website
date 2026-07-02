import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function looksLikeHtml(value) {
  return /<\/?[a-z][\s\S]*>/i.test(value || "");
}

function plainTextToHtml(value) {
  if (!value?.trim()) return "";

  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p>${line}</p>`)
    .join("");
}

function normalizeContent(value) {
  if (!value?.trim()) return "";
  return looksLikeHtml(value) ? value : plainTextToHtml(value);
}

function ToolbarButton({ active, disabled, onClick, children, title }) {
  return (
    <button
      type="button"
      className={`rich-text-button ${active ? "active" : ""}`}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write the full insight or briefing content here...",
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: normalizeContent(value),
    editorProps: {
      attributes: {
        class: "rich-text-prosemirror",
        "data-placeholder": placeholder,
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentHtml = editor.getHTML();
    const nextHtml = normalizeContent(value);

    if (nextHtml && currentHtml !== nextHtml) {
      editor.commands.setContent(nextHtml, false);
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  return (
    <div className="rich-text-editor">
      <div className="rich-text-toolbar" aria-label="Formatting toolbar">
        <ToolbarButton
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </ToolbarButton>

        <ToolbarButton
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </ToolbarButton>

        <ToolbarButton
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </ToolbarButton>

        <ToolbarButton
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </ToolbarButton>

        <ToolbarButton
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </ToolbarButton>

        <ToolbarButton
          title="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </ToolbarButton>

        <ToolbarButton
          title="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Quote
        </ToolbarButton>

        <ToolbarButton
          title="Undo"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          Undo
        </ToolbarButton>

        <ToolbarButton
          title="Redo"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          Redo
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} className="rich-text-surface" />
    </div>
  );
}