import MarkdownIt, { StateCore, Token } from "markdown-it";

export function moveBlockItemsRulerPlugin(md: MarkdownIt): void {

  md.core.ruler.push("move_block_items_out_of_inline_children_ruler", (state: StateCore): void => {
    const tokens: Token[] = [];

    for (const token of state.tokens) {
      if (token.type === "inline" && token.children) {
        const children: Token[] = [];
        let closeType: string | undefined;

        for (const child of token.children) {
          if (child.block) {
            closeType = child.type.includes("_open") ? child.type.replace("open", "close") : undefined;
          }

          if (child.block || closeType) {
            moveTokenOneLevelUp(child, token.level);
          }
          else {
            children.push(child);
          }

          if(child.type === closeType) {
            closeType = undefined;
          }
        }

        token.children = children;

        if (token.children.length > 0) {
          tokens.push(token);
        }
      }
      else {
        tokens.push(token);
      }
    }

    state.tokens = tokens;

    function moveTokenOneLevelUp(token: Token, level: number) {
      token.level = level + token.level;
      token["moved"] = true;
      tokens.push(token);
    }
  });

  md.core.ruler.push("move_block_items_out_of_paragraph_rule", (state: StateCore): void => {
    const tokens: Token[] = [];
    let paragraphOpenIdx = -1;

    for (const token of state.tokens) {
      if (token.type === "paragraph_open") {
        paragraphOpenIdx = tokens.length;
      }
      else if (token.type === "paragraph_close") {
        paragraphOpenIdx = -1;
      }

      if ((token as any).moved) {
        moveOutOfParagraph(token);
      }
      else {
        tokens.push(token);
      }

      if (token.type === "paragraph_close") {
        removeEmptyParagraph();
      }
    }

    state.tokens = tokens;

    function moveOutOfParagraph(token: Token) {
      delete token["moved"];
      if (paragraphOpenIdx >= 0) {
        token.level -= 1;
        tokens.splice(paragraphOpenIdx++, 0, token);
      }
      else {
        tokens.push(token);
      }
    }

    function removeEmptyParagraph() {
      const index = tokens.length - 2;
      if (tokens[index].type === "paragraph_open") {
        tokens.splice(index, 2);
      }
    }
  });
}