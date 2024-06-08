import { describe, expect, test } from 'vitest';
import { outlineToSections } from 'src/lib/data-conversion/outline-to-sections';

describe('outline-to-sections', () => {
    test('simple outline', () => {
        const input = ['- 1', '\t- 1.1', '\t\t- 1.2', '- 2', '- 3', '\t- 3.1'];
        const output = `
<!--section: 1-->
1

<!--section: 1.1-->
1.1

<!--section: 1.1.1-->
1.2

<!--section: 2-->
2

<!--section: 3-->
3

<!--section: 3.1-->
3.1`;

        expect(outlineToSections(input.join('\n'))).toEqual(output);
    });
    test('has new lines', () => {
        const input = [
            '- 1',
            '\t- 1.1',
            '...',
            '...',
            '\t\t- 1.2',
            '...',
            '- 2',
            '\t\t - ...',
            '- 3',
            '\t- 3.1',
        ];
        const output = `
<!--section: 1-->
1

<!--section: 1.1-->
1.1
...
...

<!--section: 1.1.1-->
1.2
...

<!--section: 2-->
2
\t\t - ...

<!--section: 3-->
3

<!--section: 3.1-->
3.1`;

        expect(outlineToSections(input.join('\n'))).toEqual(output);
    });
    test('has a section', () => {
        const input = [
            '- 1',
            '\t- 1.1',
            '<!--section: 1.2-->',
            '\t\t- 1.2',
            '- 2',
            '- 3',
            '\t- 3.1',
        ];
        expect(() => outlineToSections(input.join('\n'))).toThrowError(
            'input has a section',
        );
    });
    test('logseq demo', () => {
        const input = `- ## Hi, welcome to Logseq!
- Logseq is a *privacy-first*, [open-source](https://github.com/logseq/logseq) platform for *knowledge* management and collaboration.
- This is a 3 minute tutorial on how to use Logseq. Let's get started!
- Here are some tips that might be useful.
- 1. Let's create a page called [[How to take dummy notes?]]. You can click it to go to that page, or you can \`Shift+Click\` to open it in the right sidebar! Now you should see both *Linked References* and *Unlinked References*.
- 2. Let's reference some blocks on [[How to take dummy notes?]], you can \`Shift+Click\` any block reference to open it in the right sidebar. Try making
  some changes on the right sidebar, those referenced blocks will be changed too!  
\t- Hello, I'm a block! : This is a block reference.
\t- Hey, I'm another block! : This is another block reference.
- 3. Do you support tags?
\t- Of course, this is a #dummy tag.
- 4. Do you support tasks like todo/doing/done and priorities?
\t- Yes, type \`/\` and pick your favorite todo keyword or priority (A/B/C).
\t- NOW [#A] A dummy tutorial on "How to take dummy notes?"
\t- LATER [#A] Check out this awesome video by [:a {:href "https://twitter.com/shuomi3" :target "_blank"} "@shuomi3"] on how to use Logseq to take notes and organize your life!
\t  {{youtube(https://www.youtube.com/watch?v=BhHfF0P9A80&ab_channel=ShuOmi)}}  
\t- DONE Create a page
\t- CANCELED [#C] Write a page with more than 1000 blocks
- That's it! You can create more bullets or open a local directory to import some notes now!
- You can also download our desktop app at https://github.com/logseq/logseq/releases
-`;
        const output = `\n<!--section: 1-->\n## Hi, welcome to Logseq!
\n<!--section: 2-->\nLogseq is a *privacy-first*, [open-source](https://github.com/logseq/logseq) platform for *knowledge* management and collaboration.
\n<!--section: 3-->\nThis is a 3 minute tutorial on how to use Logseq. Let's get started!
\n<!--section: 4-->\nHere are some tips that might be useful.
\n<!--section: 5-->\n1. Let's create a page called [[How to take dummy notes?]]. You can click it to go to that page, or you can \`Shift+Click\` to open it in the right sidebar! Now you should see both *Linked References* and *Unlinked References*.
\n<!--section: 6-->\n2. Let's reference some blocks on [[How to take dummy notes?]], you can \`Shift+Click\` any block reference to open it in the right sidebar. Try making
  some changes on the right sidebar, those referenced blocks will be changed too!  
\n<!--section: 6.1-->\nHello, I'm a block! : This is a block reference.
\n<!--section: 6.2-->\nHey, I'm another block! : This is another block reference.
\n<!--section: 7-->\n3. Do you support tags?
\n<!--section: 7.1-->\nOf course, this is a #dummy tag.
\n<!--section: 8-->\n4. Do you support tasks like todo/doing/done and priorities?
\n<!--section: 8.1-->\nYes, type \`/\` and pick your favorite todo keyword or priority (A/B/C).
\n<!--section: 8.2-->\nNOW [#A] A dummy tutorial on "How to take dummy notes?"
\n<!--section: 8.3-->\nLATER [#A] Check out this awesome video by [:a {:href "https://twitter.com/shuomi3" :target "_blank"} "@shuomi3"] on how to use Logseq to take notes and organize your life!
\t  {{youtube(https://www.youtube.com/watch?v=BhHfF0P9A80&ab_channel=ShuOmi)}}  
\n<!--section: 8.4-->\nDONE Create a page
\n<!--section: 8.5-->\nCANCELED [#C] Write a page with more than 1000 blocks
\n<!--section: 9-->\nThat's it! You can create more bullets or open a local directory to import some notes now!
\n<!--section: 10-->\nYou can also download our desktop app at https://github.com/logseq/logseq/releases
-`;
        expect(outlineToSections(input)).toEqual(output);
    });
});
