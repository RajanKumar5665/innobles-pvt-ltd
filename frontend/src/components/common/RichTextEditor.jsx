import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Pilcrow,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Unlink,
  Undo2,
  Redo2,
  RemoveFormatting,
} from "lucide-react";

/**
 * Toolbar button. Uses `onMouseDown` (with preventDefault) for mouse clicks so
 * the editor keeps its selection/focus, and a `detail === 0` click for keyboard
 * activation to avoid running the command twice.
 */
const ToolbarButton = ({ title, active = false, disabled = false, onAction, children }) => {
  const run = () => {
    if (!disabled) onAction();
  };
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      className={`rte-btn${active ? " is-active" : ""}`}
      onMouseDown={(e) => {
        e.preventDefault();
        run();
      }}
      onClick={(e) => {
        if (e.detail === 0) run();
      }}
    >
      {children}
    </button>
  );
};

const Separator = () => <span className="rte-sep" aria-hidden="true" />;

/**
 * Lightweight MS Word-style rich text editor (TipTap) bound to a controlled
 * HTML string via `value` / `onChange`. Used for the blog Description field.
 */
const RichTextEditor = ({ value = "", onChange, placeholder = "Write your description…" }) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          rel: "noopener noreferrer nofollow",
          target: "_blank",
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor: current }) => onChange(current.getHTML()),
    editorProps: {
      attributes: {
        class: "rte-content",
        "aria-label": placeholder,
        spellcheck: "true",
      },
    },
  });

  // Sync externally-supplied values (draft restore / edit load) into the editor
  // without re-emitting `onChange` (emitUpdate = false) to avoid update loops.
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
  }, [editor, value]);

  if (!editor) return null;

  const setHeading = (level) => {
    if (editor.isActive("heading", { level })) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  const toggleLink = () => {
    const previous = editor.getAttributes("link").href || "";
    const url = window.prompt("Link URL", previous || "https://");
    if (url === null) return; // cancelled
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  return (
    <div className="rte">
      <div className="rte-toolbar" role="toolbar" aria-label="Formatting tools">
        <ToolbarButton title="Bold" active={editor.isActive("bold")} onAction={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton title="Italic" active={editor.isActive("italic")} onAction={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton title="Underline" active={editor.isActive("underline")} onAction={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton title="Strikethrough" active={editor.isActive("strike")} onAction={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough size={16} aria-hidden="true" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton title="Paragraph" active={editor.isActive("paragraph")} onAction={() => editor.chain().focus().setParagraph().run()}>
          <Pilcrow size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton title="Heading 1" active={editor.isActive("heading", { level: 1 })} onAction={() => setHeading(1)}>
          <Heading1 size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton title="Heading 2" active={editor.isActive("heading", { level: 2 })} onAction={() => setHeading(2)}>
          <Heading2 size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton title="Heading 3" active={editor.isActive("heading", { level: 3 })} onAction={() => setHeading(3)}>
          <Heading3 size={16} aria-hidden="true" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton title="Bullet list" active={editor.isActive("bulletList")} onAction={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton title="Numbered list" active={editor.isActive("orderedList")} onAction={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton title="Quote" active={editor.isActive("blockquote")} onAction={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={16} aria-hidden="true" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton title="Align left" active={editor.isActive({ textAlign: "left" })} onAction={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton title="Align center" active={editor.isActive({ textAlign: "center" })} onAction={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton title="Align right" active={editor.isActive({ textAlign: "right" })} onAction={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton title="Justify" active={editor.isActive({ textAlign: "justify" })} onAction={() => editor.chain().focus().setTextAlign("justify").run()}>
          <AlignJustify size={16} aria-hidden="true" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton title="Add or edit link" active={editor.isActive("link")} onAction={toggleLink}>
          <LinkIcon size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton title="Remove link" disabled={!editor.isActive("link")} onAction={() => editor.chain().focus().unsetLink().run()}>
          <Unlink size={16} aria-hidden="true" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton title="Undo" disabled={!editor.can().undo()} onAction={() => editor.chain().focus().undo().run()}>
          <Undo2 size={16} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton title="Redo" disabled={!editor.can().redo()} onAction={() => editor.chain().focus().redo().run()}>
          <Redo2 size={16} aria-hidden="true" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton
          title="Clear formatting"
          onAction={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        >
          <RemoveFormatting size={16} aria-hidden="true" />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} className="rte-editor" />
    </div>
  );
};

export default RichTextEditor;
