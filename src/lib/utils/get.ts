import { formatKebabCaseToCamelCase } from "./format";

export async function getChecklistInformation(
  checklistCategory: string,
  checklist: string
): Promise<any> {
  try {
    const articleModule = await import(
      `@/lib/constants/checklists/${checklistCategory}/${checklist}`
    );
    // Return the specific named export that matches checklist
    if (articleModule[formatKebabCaseToCamelCase(checklist)]) {
      return articleModule[formatKebabCaseToCamelCase(checklist)];
    } else {
      console.error(
        `Export named ${formatKebabCaseToCamelCase(
          checklist
        )} not found in module`
      );
      return [];
    }
  } catch (error) {
    console.error(`Error loading resource: ${error}`);
    return [];
  }
}
