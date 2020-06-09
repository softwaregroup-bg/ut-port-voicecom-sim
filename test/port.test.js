require('ut-run').run({
    main: [
        () => ({
            test: () => [
                require('..')
            ]
        })
    ],
    method: 'unit',
    config: {
        test: true
    },
    params: {
        steps: []
    }
});
