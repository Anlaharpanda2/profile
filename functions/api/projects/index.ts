import { makeCollectionHandlers } from "../../_lib/crud";
import { validateProject } from "../../_lib/validators";
import type { Project } from "../../../lib/types";

const handlers = makeCollectionHandlers<Project>({
  path: "data/projects.json",
  kind: "project",
  validate: validateProject,
  sort: (a, b) => (a.num < b.num ? -1 : a.num > b.num ? 1 : 0),
});

export const onRequestGet = handlers.onGet;
export const onRequestPost = handlers.onPost;
