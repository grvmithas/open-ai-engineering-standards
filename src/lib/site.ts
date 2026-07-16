import packageMetadata from '../../package.json';

export const SITE_VERSION = packageMetadata.version;
export const REPOSITORY_URL = packageMetadata.repository.url.replace(/\.git$/, '');
