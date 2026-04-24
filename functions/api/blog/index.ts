import { makeCollectionHandlers } from "../../_lib/crud";
import { validateBlogPost } from "../../_lib/validators";
import type { BlogPost } from "../../../lib/types";

const handlers = makeCollectionHandlers<BlogPost>({
  path: "data/blog.json",
  kind: "article",
  validate: validateBlogPost,
  sort: (a, b) => (a.date < b.date ? 1 : -1),
});

export const onRequestGet = handlers.onGet;
export const onRequestPost = handlers.onPost;
