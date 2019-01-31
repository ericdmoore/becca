exports.version1 = (req, res)=>{
    const protoPrefix = req.secure ? "http://" : "http://";
    const _startLink = protoPrefix + req.headers.host + "/v1";
    return res.json({
        resources:{
            tokens:{
                _meta:{
                    METHODS:'GET',
                    _link: _startLink + '/tokens.json',
                    _jsStringTemplate: '/v1/tokens.json?user=${user}&password=${password}',
                    _credentials: {user:"@string::utf-8", password:"@string::utf-8"},
                    _requiresAuthN: true,
                    _requiresAuthZ: true,
                    _samplejQ: `| jq '[.resources]'`,
                },
                params:{
                    headers: null,
                    cookies:{
                        user: {
                            descr:"user name for internal systems",
                            type: "@string::utf-8"
                        },
                        password: {
                            descr:"password for internal systems @string::utf-8",
                            type: "@string::utf-8"
                        }
                    },
                    query:{
                        user: {
                            descr:"user name for internal systems",
                            type: "@string::utf-8"
                        },
                        password: {
                            descr:"password for internal systems",
                            type: "@string::utf-8"
                        }
                    },
                    payload: {},
                },
                response:{
                    status:{
                        200 : {msg: "sessionToken is returned as a Cookie and JSON - as well with other meta data"},
                        404 : {msg: "user / password were not found, or not valid from the request"},
                        412 : {msg: "sessionToken is present but likely expired or corrupted"}
                    },
                    headers:{
                        SetCookies:{
                            sessionToken: "session token value"
                        }
                    },
                    body:{
                        
                    },
                },
                notes:"Order of precedance for params: cookies >> body >> query"
            },
            classMembers:{
                _meta:{
                    METHODS:'GET',
                    _link: _startLink + '/classMembers.json',
                    _jsStringTemplate: '/v1/classMembers.json?userToken=${userToken}&sessionToken=${sessionToken}'
                },
                params:{
                    headers: null,
                    cookies:{
                        userToken:{
                            descr:"represents the user name provided",
                            type: "@string::utf-8",
                        },
                        sessionToken:{
                            descr:"represents the registration",
                            type: "@string::utf-8",
                        },
                    },
                    query:{
                        userToken:{

                        },
                        sessionToken:{

                        },
                    },
                    payload: {},
                },
                response:{

                },
                notes:"",
            }
        }
    })
}