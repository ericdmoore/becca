exports.handler = (req, res)=>{

    // @ToDo Fix: Add HTTPS back
    const protoPrefix = req.secure ? "http://" : "http://"

    res.json({
                apiVersions:[ 
                    {
                        v1:{
                            statusCode:"GA",
                            status:"general availabiltiy",
                            _documentation:"http://github.com/ericdmoore/",
                            _issues:"http://github.com/ercidmoore",
                            _link: protoPrefix + req.headers.host + "/v1",
                        }
                    },
                    {
                        v2:{
                            statusCode:"NA",
                            status:"not available"
                        }
                    },
                ]
            });
};