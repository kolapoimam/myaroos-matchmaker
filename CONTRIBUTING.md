# Contributing to MyAroos

Jazakallahu khairan for wanting to help. MyAroos gets better when scholars, counsellors, designers, writers and developers pitch in. Every contribution counts, from fixing a typo to adding a whole new feature.

## Ways to help

| You are a... | You can help by |
| --- | --- |
| Developer | Fixing bugs, improving accessibility, adding features, writing tests |
| Designer | Improving layouts, illustrations, the report design, dark mode |
| Student of knowledge | Reviewing questions, hadith references and guidance for accuracy |
| Marriage counsellor | Suggesting better questions, scoring and improvement tips |
| Writer or translator | Improving copy, the funny result messages, or adding a new language |

Not sure where to start? Look for issues labelled `good first issue` or `help wanted`.

## Getting set up

You need Node.js 18 or newer and npm.

```sh
git clone https://github.com/kolapoimam/myaroos-matchmaker.git
cd myaroos-matchmaker
npm install
npm run dev
```

The app runs at http://localhost:8080.

Before you open a pull request, make sure these pass.

```sh
npm run lint
npm run build
```

## Project map

| Path | What lives there |
| --- | --- |
| `src/data/readiness.ts` | Marriage Readiness Quiz categories, questions and option scores |
| `src/data/compatibility.ts` | Compatibility questions and religious values lists |
| `src/pages/` | One file per page (Home, Readiness, Compatibility, About, 404) |
| `src/components/` | Shared UI such as `QuestionCard`, `Stepper`, `ScoreRing`, `ReportCard` |
| `src/components/ui/` | shadcn/ui primitives. Avoid editing unless needed |
| `src/lib/exportReport.ts` | PNG and PDF export logic |
| `src/index.css` | Theme colours (light and dark) and global styles |

## Common changes

### Adding or editing a question

1. Open `src/data/readiness.ts` or `src/data/compatibility.ts`.
2. Add a question object with a unique `id`, the `question` text and its `options`.
3. Give each option a `score` from 0 to 10. The highest score in a question is its maximum.
4. For preference questions where no answer is better than another, give every option the same score.
5. If your question should produce an improvement tip, add a `case` for its `id` in the page's tip logic.

Please explain in your pull request why the question matters for an Islamic marriage. If it touches fiqh, cite your source.

### Changing colours or fonts

Theme tokens live at the top of `src/index.css`. Fonts are self hosted through Fontsource and registered in `tailwind.config.ts`.

### Changing the downloadable report

The PNG and PDF are made from `src/components/ReportCard.tsx`. It uses inline styles and fixed colours on purpose, so exports look the same on every device. Elements marked with `data-pdf-block` are safe page break points for the PDF.

## Pull request checklist

- [ ] The change is focused on one thing
- [ ] `npm run lint` and `npm run build` pass
- [ ] UI changes include a before and after screenshot
- [ ] It works on mobile and in dark mode
- [ ] Religious content includes a source where relevant
- [ ] No user data is stored or sent anywhere

## Commit messages

Short and clear is enough. For example `fix: score ring overflow on small screens` or `feat: add Arabic translation`.

## Code of conduct

By taking part you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Be kind, be honest and assume good intentions.
