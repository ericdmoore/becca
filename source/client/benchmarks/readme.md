# Benchmarks

## Questions - ? Instrument What

1. What to run performance tests on?
1. What to collect?
    1. through put? (function returns per sec)?
        1. complete N calls - meter
1. How/where to collect the responses?
    1. Start with FS collection
        1. use save on disk as : `< file >.jsonl.gz` ?
    2. Graduate to network collection?
        1. AWS - Firehose?
        1. parameterized deploy of the network collector?
1. How/Where to analyze the results?
    1. Start with Local Analyis
        1. Jupyer Notebook? Sure! But with `node/D3/SVG` analysis?
        1. Or just move to `python/pandas/mpl`
            1. trade off is the
1. Is there any merit to leaving timers and such embdedded in the code, & swtiching the collector to be an API instead of the FS during build time?

## Instrument ? This

1. Anything that blocks the js main thread
1. Largely Actions, right?
1. IO/Effects? seems subject to a lot of noise/ with network conditions? etc?
1. Number of requests made by the app while accomplishing various tasks?

### Other Considerations

1. Would any ratelimiting need to be toggled during benchmarks

### Prior Art

- [Rambda Benchmarks (uses benchmarks.js)](https://github.com/selfrefactor/rambda#benchmark)
- [https://benchmarkjs.com/](//benchmarkjs.com/)
- [https://stackoverflow.com/questions/1003855/how-can-i-benchmark-javascript-code](//stackoverflow.com/questions/1003855/how-can-i-benchmark-javascript-code)