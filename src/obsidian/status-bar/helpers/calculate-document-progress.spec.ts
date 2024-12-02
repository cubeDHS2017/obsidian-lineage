import { calculateDocumentProgress } from 'src/obsidian/status-bar/helpers/calculate-document-prorgess';
import { describe, expect, test } from 'vitest';

describe('calculateDocumentProgress', () => {
    test('case 1', () => {
        const input = {
            document: {
                columns: [
                    {
                        id: 'c-6vLsdbr',
                        groups: [
                            {
                                nodes: [
                                    'ntfVbQ5YI',
                                    'n1LHmbzW4',
                                    'n9BuDZkT2',
                                    'nCmycpN94',
                                    'nUnMJ3Wcg',
                                ],
                                parentId: 'rHtwvyov0',
                            },
                        ],
                    },
                ],
                content: {
                    ntfVbQ5YI: {
                        content: '1',
                    },
                    n1LHmbzW4: {
                        content: '2',
                    },
                    n9BuDZkT2: {
                        content: '3',
                    },
                    nCmycpN94: {
                        content: '4',
                    },
                    nUnMJ3Wcg: {
                        content: '5',
                    },
                },
            },
            activeNode: 'n1LHmbzW4',
        };
        const actual = calculateDocumentProgress(input);
        expect(actual).toEqual(40);
    });

    test('case 2', () => {
        const input = {
            document: {
                columns: [
                    {
                        id: 'cC0WR-9WP',
                        groups: [
                            {
                                nodes: [
                                    'nvSBNknOY',
                                    'nLy8du7jL',
                                    'nJzIkZR6H',
                                    'ngP8YLv51',
                                    'nhzjXkrHH',
                                    'neOr77x-k',
                                    'nysY5Y5rb',
                                    'n-6ZMq6xq',
                                    'nGEGBudmg',
                                    'nBozikm0V',
                                ],
                                parentId: 'r6vdSNjrd',
                            },
                        ],
                    },
                ],
                content: {
                    nvSBNknOY: {
                        content: '01',
                    },
                    nLy8du7jL: {
                        content: '02',
                    },
                    nJzIkZR6H: {
                        content: '03',
                    },
                    ngP8YLv51: {
                        content: '04',
                    },
                    nhzjXkrHH: {
                        content: '05',
                    },
                    'neOr77x-k': {
                        content: '06',
                    },
                    nysY5Y5rb: {
                        content: '07',
                    },
                    'n-6ZMq6xq': {
                        content: '08',
                    },
                    nGEGBudmg: {
                        content: '09',
                    },
                    nBozikm0V: {
                        content: '10',
                    },
                },
            },
            activeNode: 'nhzjXkrHH',
        };
        const actual = calculateDocumentProgress(input);
        expect(actual).toEqual(50);
    });

    test('case: 2 levels tree', () => {
        const input = {
            document: {
                columns: [
                    {
                        id: 'cC0WR-9WP',
                        groups: [
                            {
                                nodes: [
                                    'nwxUuZe-D',
                                    'nqoHsqqyx',
                                    'nOKG7OsN7',
                                    'nEcDodGFU',
                                    'nyVpT7T6H',
                                    'n1AG_Fqex',
                                    'n1GAZVbbJ',
                                    'nZ7h0Xef9',
                                    'n6loRdXXk',
                                    'n5_6sFyA9',
                                ],
                                parentId: 'r6vdSNjrd',
                            },
                        ],
                    },
                    {
                        id: 'cE3xOsjC5',
                        groups: [
                            {
                                nodes: [
                                    'nYfbXVX-I',
                                    'nHphUJmHC',
                                    'ntfyXAcyj',
                                    'nD6M6jIeY',
                                    'nBMYSUE--',
                                    'nVmdyVVkc',
                                    'nNmouImC0',
                                    'nmdI2WDFD',
                                    'n872D9tT1',
                                    'n7KAjqwLd',
                                ],
                                parentId: 'n5_6sFyA9',
                            },
                        ],
                    },
                ],
                content: {
                    'nwxUuZe-D': {
                        content: '01',
                    },
                    nqoHsqqyx: {
                        content: '02',
                    },
                    nOKG7OsN7: {
                        content: '03',
                    },
                    nEcDodGFU: {
                        content: '04',
                    },
                    nyVpT7T6H: {
                        content: '05',
                    },
                    n1AG_Fqex: {
                        content: '06',
                    },
                    n1GAZVbbJ: {
                        content: '07',
                    },
                    nZ7h0Xef9: {
                        content: '08',
                    },
                    n6loRdXXk: {
                        content: '09',
                    },
                    n5_6sFyA9: {
                        content: '10',
                    },
                    n7KAjqwLd: {
                        content: '10',
                    },
                    n872D9tT1: {
                        content: '09',
                    },
                    nmdI2WDFD: {
                        content: '08',
                    },
                    nNmouImC0: {
                        content: '07',
                    },
                    nVmdyVVkc: {
                        content: '06',
                    },
                    'nBMYSUE--': {
                        content: '05',
                    },
                    nD6M6jIeY: {
                        content: '04',
                    },
                    ntfyXAcyj: {
                        content: '03',
                    },
                    nHphUJmHC: {
                        content: '02',
                    },
                    'nYfbXVX-I': {
                        content: '01',
                    },
                },
            },
            activeNode: 'n7KAjqwLd',
        };
        const actual = calculateDocumentProgress(input);
        expect(actual).toEqual(100);
    });

    test('empty tree', () => {
        const input = {
            document: {
                columns: [
                    {
                        id: 'cKybSePCm',
                        groups: [
                            {
                                parentId: 'rmeeoRvgr',
                                nodes: ['nrnLOPNip'],
                            },
                        ],
                    },
                ],
                content: {
                    nrnLOPNip: {
                        content: '',
                    },
                },
            },
            activeNode: 'nrnLOPNip',
        };
        const actual = calculateDocumentProgress(input);
        expect(actual).toEqual(0);
    });
});
