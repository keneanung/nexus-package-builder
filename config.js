// Set up your project here
const author = 'keneanung';  // author name on GitHub, might also be an org
const projectName = 'nexus-package-builder'; // project name on GitHub
const npmPackageName = 'nexus-package-builder'; // Name of the NPM package that should be published
const projectDescription = 'Tool to create a Iron Realms nexus native package from individual files'; // Project description in the NPM package
const authorEmail = 'keneanung@gmail.com' // author email address


// don't modify the exports below (except to add new fields)
module.exports = {
    author,
    projectName,
    githubRepoWebUrl: `https://github.com/${author}/${projectName}`,
    githubRepoGitUrl: `git://github.com/${author}/${projectName}.git`,
    npmPackageName,
    projectDescription,
    authorEmail,
}