import { describe, expect, test } from 'vitest';
import { headingsToHtmlComment } from 'src/lib/data-conversion/x-to-html-comment/headings-to-html-comment';

describe('headingsToHtmlComment', () => {
    test('should annotate headings based on level', () => {
        const input = `
# 1
...
## 1.1
...
...
### 1.1.1
...
#### 1.1.1.1
...
...
...
##### 1.1.1.1.1
...
...
## 1.2
...
...
...
...
...
...
### 1.2.1
...
...
#### 1.2.1.1
...
...
...
...
### 1.2.2
...
...
## 1.3
...
...
...
...
# 2
...
...
## 2.1
### 2.1.1
...
...
#### 2.1.1.1
...
...
### 2.1.2
...
...
## 2.2
...
...
### 2.2.1
...
...
#### 2.2.1.1
...
...
##### 2.2.1.1.1
...
...
# 3
...
...
## 3.1
...
...
### 3.1.1
...
...
#### 3.1.1.1
...
...
### 3.1.2
...
...
## 3.2
...
...
### 3.2.1
...
...
#### 3.2.1.1
...
...
### 3.2.2
...
...
## 3.3
...
...
`;
        const output = `
<!--section: 1-->
# 1
...

<!--section: 1.1-->
## 1.1
...
...

<!--section: 1.1.1-->
### 1.1.1
...

<!--section: 1.1.1.1-->
#### 1.1.1.1
...
...
...

<!--section: 1.1.1.1.1-->
##### 1.1.1.1.1
...
...

<!--section: 1.2-->
## 1.2
...
...
...
...
...
...

<!--section: 1.2.1-->
### 1.2.1
...
...

<!--section: 1.2.1.1-->
#### 1.2.1.1
...
...
...
...

<!--section: 1.2.2-->
### 1.2.2
...
...

<!--section: 1.3-->
## 1.3
...
...
...
...

<!--section: 2-->
# 2
...
...

<!--section: 2.1-->
## 2.1

<!--section: 2.1.1-->
### 2.1.1
...
...

<!--section: 2.1.1.1-->
#### 2.1.1.1
...
...

<!--section: 2.1.2-->
### 2.1.2
...
...

<!--section: 2.2-->
## 2.2
...
...

<!--section: 2.2.1-->
### 2.2.1
...
...

<!--section: 2.2.1.1-->
#### 2.2.1.1
...
...

<!--section: 2.2.1.1.1-->
##### 2.2.1.1.1
...
...

<!--section: 3-->
# 3
...
...

<!--section: 3.1-->
## 3.1
...
...

<!--section: 3.1.1-->
### 3.1.1
...
...

<!--section: 3.1.1.1-->
#### 3.1.1.1
...
...

<!--section: 3.1.2-->
### 3.1.2
...
...

<!--section: 3.2-->
## 3.2
...
...

<!--section: 3.2.1-->
### 3.2.1
...
...

<!--section: 3.2.1.1-->
#### 3.2.1.1
...
...

<!--section: 3.2.2-->
### 3.2.2
...
...

<!--section: 3.3-->
## 3.3
...
...
`;
        expect(headingsToHtmlComment(input)).toEqual(output);
    });
    test('should not discard text before the first heading', () => {
        const input = `
...
...

...        
# 1
...
## 1.1
...
...
### 1.1.1
...
#### 1.1.1.1
...
...
...
##### 1.1.1.1.1
...
...
## 1.2
...
# 2
...
`;

        const output = `
<!--section: 1-->
...
...

...        

<!--section: 2-->
# 1
...

<!--section: 2.1-->
## 1.1
...
...

<!--section: 2.1.1-->
### 1.1.1
...

<!--section: 2.1.1.1-->
#### 1.1.1.1
...
...
...

<!--section: 2.1.1.1.1-->
##### 1.1.1.1.1
...
...

<!--section: 2.2-->
## 1.2
...

<!--section: 3-->
# 2
...
`;
        expect(headingsToHtmlComment(input)).toEqual(output);
    });

    test('should reject text that has a section annotation', () => {
        const input = `
# 1
...
## 1.1
...
...
<!--section: 1-->
### 1.1.1`;
        expect(() => headingsToHtmlComment(input)).toThrow(
            'input has a section',
        );
    });

    test('...', () => {
        const input = `# 1
..
..
..

## 1.1
..
..
..

## 1.2
..
..

### 1.2.1
..
..

## 1.3
..
..

### 1.3.1
..
..

### 1.3.2
..
..

#### 1.3.2.1
..
..

#### 1.3.2.2
..
..

##### 1.3.2.2.1
..
..

##### 1.3.2.2.2
..
..

# 2
..
..
..

## 2.1
..
..

## 2.2
..
..

### 2.2.1
..
..

### 2.2.2
..
..

#### 2.2.2.1
..
..

#### 2.2.2.2
..
..

##### 2.2.2.2.1
..
..

##### 2.2.2.2.2
..
..

# 3
..
..
..

## 3.1
..
..

## 3.2
..
..

### 3.2.1
..
..

### 3.2.2
..
..

#### 3.2.2.1
..
..

#### 3.2.2.2
..
..

##### 3.2.2.2.1
..
..

##### 3.2.2.2.2
..
..

# 4
..
..
..

## 4.1
..
..

## 4.2
..
..

### 4.2.1
..
..

### 4.2.2
..
..

#### 4.2.2.1
..
..

#### 4.2.2.2
..
..

##### 4.2.2.2.1
..
..

##### 4.2.2.2.2
..
..

# 5
..
..
..

## 5.1
..
..

## 5.2
..
..

### 5.2.1
..
..

### 5.2.2
..
..

#### 5.2.2.1
..
..

#### 5.2.2.2
..
..

##### 5.2.2.2.1
..
..

##### 5.2.2.2.2
..
..`;

        const output = `
<!--section: 1-->
# 1
..
..
..


<!--section: 1.1-->
## 1.1
..
..
..


<!--section: 1.2-->
## 1.2
..
..


<!--section: 1.2.1-->
### 1.2.1
..
..


<!--section: 1.3-->
## 1.3
..
..


<!--section: 1.3.1-->
### 1.3.1
..
..


<!--section: 1.3.2-->
### 1.3.2
..
..


<!--section: 1.3.2.1-->
#### 1.3.2.1
..
..


<!--section: 1.3.2.2-->
#### 1.3.2.2
..
..


<!--section: 1.3.2.2.1-->
##### 1.3.2.2.1
..
..


<!--section: 1.3.2.2.2-->
##### 1.3.2.2.2
..
..


<!--section: 2-->
# 2
..
..
..


<!--section: 2.1-->
## 2.1
..
..


<!--section: 2.2-->
## 2.2
..
..


<!--section: 2.2.1-->
### 2.2.1
..
..


<!--section: 2.2.2-->
### 2.2.2
..
..


<!--section: 2.2.2.1-->
#### 2.2.2.1
..
..


<!--section: 2.2.2.2-->
#### 2.2.2.2
..
..


<!--section: 2.2.2.2.1-->
##### 2.2.2.2.1
..
..


<!--section: 2.2.2.2.2-->
##### 2.2.2.2.2
..
..


<!--section: 3-->
# 3
..
..
..


<!--section: 3.1-->
## 3.1
..
..


<!--section: 3.2-->
## 3.2
..
..


<!--section: 3.2.1-->
### 3.2.1
..
..


<!--section: 3.2.2-->
### 3.2.2
..
..


<!--section: 3.2.2.1-->
#### 3.2.2.1
..
..


<!--section: 3.2.2.2-->
#### 3.2.2.2
..
..


<!--section: 3.2.2.2.1-->
##### 3.2.2.2.1
..
..


<!--section: 3.2.2.2.2-->
##### 3.2.2.2.2
..
..


<!--section: 4-->
# 4
..
..
..


<!--section: 4.1-->
## 4.1
..
..


<!--section: 4.2-->
## 4.2
..
..


<!--section: 4.2.1-->
### 4.2.1
..
..


<!--section: 4.2.2-->
### 4.2.2
..
..


<!--section: 4.2.2.1-->
#### 4.2.2.1
..
..


<!--section: 4.2.2.2-->
#### 4.2.2.2
..
..


<!--section: 4.2.2.2.1-->
##### 4.2.2.2.1
..
..


<!--section: 4.2.2.2.2-->
##### 4.2.2.2.2
..
..


<!--section: 5-->
# 5
..
..
..


<!--section: 5.1-->
## 5.1
..
..


<!--section: 5.2-->
## 5.2
..
..


<!--section: 5.2.1-->
### 5.2.1
..
..


<!--section: 5.2.2-->
### 5.2.2
..
..


<!--section: 5.2.2.1-->
#### 5.2.2.1
..
..


<!--section: 5.2.2.2-->
#### 5.2.2.2
..
..


<!--section: 5.2.2.2.1-->
##### 5.2.2.2.1
..
..


<!--section: 5.2.2.2.2-->
##### 5.2.2.2.2
..
..`;
        expect(headingsToHtmlComment(input)).toEqual(output);
    });

    test('first level is not h1', () => {
        const input = [
            '### 1',
            '...',
            '#### 1.1',
            '...',
            '### 2',
            '...',
            '#### 2.1',
            '...',
        ].join('\n');

        const output = [
            '',
            '<!--section: 1-->',
            '### 1',
            '...',
            '',
            '<!--section: 1.1-->',
            '#### 1.1',
            '...',
            '',
            '<!--section: 2-->',
            '### 2',
            '...',
            '',
            '<!--section: 2.1-->',
            '#### 2.1',
            '...',
        ].join('\n');
        expect(headingsToHtmlComment(input)).toEqual(output);
    });

    test('first level is not h1 (2)', () => {
        const input = `### H3
###### H6 
#### H4
## H2`;

        const output = `
<!--section: 1-->
## H3

<!--section: 1.1-->
### H6 

<!--section: 1.2-->
### H4

<!--section: 2-->
## H2`;
        expect(headingsToHtmlComment(input)).toEqual(output);
    });

    test('first level is not h1 (3)', () => {
        const input = `## H2

text 1
#### H4


text 2
### H3

text 3`;

        const output = `
<!--section: 1-->
## H2

text 1

<!--section: 1.1-->
### H4


text 2

<!--section: 1.2-->
### H3

text 3`;
        expect(headingsToHtmlComment(input)).toEqual(output);
    });

    test('weird bug', () => {
        const input = `## H2

### H3

text 1

### H3

text 2
#### H4

- item 1.
- item 2
- item 3`;
        const output = `
<!--section: 1-->
## H2


<!--section: 1.1-->
### H3

text 1


<!--section: 1.2-->
### H3

text 2

<!--section: 1.2.1-->
#### H4

- item 1.
- item 2
- item 3`;
        expect(headingsToHtmlComment(input)).toEqual(output);
    });

    test('code block', () => {
        const input = `## H2

text 1
\`\`\`python
# text

text
\`\`\`


text 2
### H3

text 3`;

        const output = `
<!--section: 1-->
## H2

text 1
\`\`\`python
# text

text
\`\`\`


text 2

<!--section: 1.1-->
### H3

text 3`;
        expect(headingsToHtmlComment(input)).toEqual(output);
    });
});
