# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.2 - 1.2.3] - 2021-08-02
### Removed
- Add check for .counter-element class to become the draw target
- Fix .find... We aren't in jQuery land anymore >.>

## [1.2.1] - 2021-05-20
### Removed
- Remove console logs

## [1.2.0] - 2020-11-27
### Added
- Intersection observer to trigger only when in view
- More data-attribute options for prefix/suffix (e.g $ or %)

## [1.1.0] - 2020-10-24
### Added
- Unit tests using Jest
- CHANGELOG.md added
- A DOM element can now be supplied rather than just an ID when applying applying animations one at a time

### Changed
- Minor changes to README.md

### Fixed
- Multiple animations will no longer run on the same element simultaneously


## [1.0.5] - 2020-10-11
### Added
- More examples added to the demo page.

### Fixed
- Multiple animations can no longer run on the same element simultaneously.

