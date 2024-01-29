"use client";

import {
  defaultBlockSchema,
  defaultBlockSpecs,
  defaultProps,
} from "@blocknote/core";
import {
  BlockNoteView,
  useBlockNote,
  createReactBlockSpec,
  ReactSlashMenuItem,
  getDefaultReactSlashMenuItems,
  lightDefaultTheme,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { RiText } from "react-icons/ri";
import { HeroSection } from "../[locale]/(home)/components/hero-section";
import { useEffect, useState } from "react";
import { Button } from "./button";

export default function Editor() {
  // Creates a paragraph block with custom font.
  const FontParagraphBlock = createReactBlockSpec(
    {
      type: "newHtmlBlock",
      propSchema: {
        ...defaultProps,
        font: {
          default: "Comic Sans MS",
        },
      },
      content: "inline",
    },
    {
      render: ({ block, contentRef }) => {
        const [title, setTitle] = useState("This is Title");
        const style = {
          fontFamily: block.props.font,
        };

        const content = (
          <div ref={contentRef} style={style}>
            <div>
              <div>{title}</div>

              <Button
                onClick={() => setTitle(`${Math.round(Math.random() * 10)}`)}
              >
                update title
              </Button>
              {/* <HeroSection /> */}

              <iframe
                width="100%"
                style={{ borderRadius: "10px" }}
                height="315"
                src="https://www.youtube.com/embed/rXDCAAkiC-s?si=N32AsmYwRftPyq4L"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        );

        // const id = block.id;
        const blockContentLength = block.content.length;
        if (blockContentLength < 1)
          block.content.push({ type: "video", url: "..." } as any);
        // console.log(block, "block");

        return content;
      },
      toExternalHTML: ({ contentRef }) => <p ref={contentRef} />,
      parse: (element) => {
        const font = element.style.fontFamily;

        if (font === "") {
          return;
        }

        return {
          font: font || undefined,
        };
      },
    }
  );

  // Our block schema, which contains the configs for blocks that we want our
  // editor to use.
  const blockSchema = {
    // Adds all default blocks.
    ...defaultBlockSchema,
    // Adds the font paragraph.
    newHtmlBlock: FontParagraphBlock.config,
  };
  // Our block specs, which contain the configs and implementations for blocks
  // that we want our editor to use.
  const blockSpecs = {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the font paragraph.
    newHtmlBlock: FontParagraphBlock,
  };

  // Creates a slash menu item for inserting a font paragraph block.
  const insertFontParagraph: ReactSlashMenuItem<typeof blockSchema> = {
    name: "Youtube",
    execute: (editor) => {
      editor.insertBlocks(
        [
          {
            type: "newHtmlBlock",
            props: {
              font: "" || undefined,
            },
          },
        ],
        editor.getTextCursorPosition().block,
        "after"
      );
    },
    aliases: ["p", "paragraph", "font"],
    group: "Components",
    icon: <RiText />,
  };

  // Creates a new editor instance.
  const editor = useBlockNote({
    // Tells BlockNote which blocks to use.
    blockSpecs: blockSpecs,

    slashMenuItems: [
      ...getDefaultReactSlashMenuItems(blockSchema),
      insertFontParagraph,
    ],
    onEditorContentChange: async (edit) => {
      console.log(edit.topLevelBlocks);
      // const html = await edit.blocksToHTMLLossy(edit.topLevelBlocks);
      // console.log(html);
    },
  });

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} theme={lightDefaultTheme} />;
}

// const BlockNoteNewBlock = () => {
//   const [title, setTitle] = useState("This is Title");

//   return (
//     <div>
//       <div>{title}</div>
//       <div className="flex gap-[20px] justify-between">
//         <Image
//           width={400}
//           height={400}
//           src={
//             "https://images.unsplash.com/photo-1682687982502-1529b3b33f85?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           }
//           alt={"new"}
//         />
//         <Image
//           width={400}
//           height={400}
//           src={
//             "https://images.unsplash.com/photo-1682687982502-1529b3b33f85?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           }
//           alt={"new"}
//         />
//       </div>

//       <Button onClick={() => setTitle("new Title")}>update title</Button>
//       <HeroSection />
//     </div>
//   );
// };
