# Benchmarks

## Questions

### Instrument What?

1. What to run performance tests on?
1. What to collect?
    1. through put? (function returns per sec)?
        1. complete N calls - meter
1. How/where to collect the responses?
    1. Start with FS collection
        1. use save on disk as : `< file >.jsonl.gz` ?
        1. check tagged  this in to the repo so that some level 
    2. Graduate to network collection?
        1. AWS - Firehose?
        1. parameterized deploy of the network collector?
1. When to cut a bench test
    1. Each major/minor verison
    1. Pre commit, right?
1. How/Where to analyze the results?
    1. Start with Local Analyis
        1. Jupyer Notebook? Sure! But with `node/D3/SVG` analysis?
        1. Or just move to `python/pandas/mpl`
            1. trade off is the
    1. Would be nice to annotate the data - especially in the event that there was a decision to accept a slower overall system because it created new and desird functionality that outweighted the perf hit.
1. Is there any merit to leaving timers and such embdedded in the code, & swtiching the collector to be an API instead of the FS during build time? I don't think so, but if this happend - I would create an .env entry for the collector/API host.


### Instrument This?

1. Absolutel any sync function (aka blockin the event loop)
1. Largely Actions, right?
1. IO/Effects? seems subject to a lot of noise/ with network conditions? etc?
1. Number of requests made by the app while accomplishing various tasks?

#### Other Considerations

1. Would any ratelimiting need to be toggled during benchmarks

#### Prior Art

- [https://benchmarkjs.com/](//benchmarkjs.com/)
- [Ramda Benchmarks(w/ benchmarks.js)](//github.com/ramda/ramda/blob/master/scripts/benchRunner)
- [Rambda Benchmarks (w/ benchmarks.js)](//github.com/selfrefactor/rambda#benchmark)
- [https://stackoverflow.com/questions/1003855/how-can-i-benchmark-javascript-code](//stackoverflow.com/questions/1003855/how-can-i-benchmark-javascript-code)
