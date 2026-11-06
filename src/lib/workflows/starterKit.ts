/**

 * Site-facing kit API — client-safe exports only.

 * Server routes must import generateStarterKit from kit-core/generate.js directly

 * (that module uses node:fs and must not enter the client bundle).

 */

export {

  getInstallCommands,

  buildInstallQuery,

  describeInstallLayout,

  layoutFor,

} from '../../../packages/kit-core/lib/install-api.js';



export type StarterKitBundle = {
  kitVersion?: string;
  stack: string;
  generatedAt: string;
  profile: Record<string, string>;
  files: Record<string, string>;
  layout?: {
    rootFiles: string[];
    ideRoot: string;
    ideOnly?: string[];
    sharedRoot?: string[];
    rulesFile: string;
    skillsDir: string;
    promptsDir: string;
    cookbookDir: string;
    guidesDir: string;
    agentsDir: string;
    mcpsDir: string;
    templatesDir?: string;
    mcpFile: string | null;
    policyFile: string;
    hooksFile?: string;
  };
};



export function downloadStarterKitJson(bundle: StarterKitBundle): void {

  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');

  a.href = url;

  a.download = `aies-${bundle.stack}-starter-kit.json`;

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);

  URL.revokeObjectURL(url);

}


