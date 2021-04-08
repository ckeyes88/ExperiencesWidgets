import { MatcherFunction } from "@testing-library/preact";

type Query = (f: MatcherFunction) => HTMLElement;

export const withMarkup = (query: Query) => (text: string): HTMLElement =>
  query((_: string, node: HTMLElement) => {
    const hasText = (node: HTMLElement) => node.textContent === text;
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child as HTMLElement),
    );
    return hasText(node) && childrenDontHaveText;
  });
