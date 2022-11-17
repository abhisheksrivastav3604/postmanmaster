import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import { faFileWaveform } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";


class Home1 extends Component {
    state = {
        form: {
            method: "get", fetchurl: "", data: "", key1: "", key2: "", key3: "", value1: "",
            value2: "", value3: "", desc1: "", desc2: "", desc3: "", response: "",
        },
        headersdata: {},
        searches: { search: "" },
        status: "",
        statusText: "",
        hide: false,
        time: "",
        index: 0,
        history: 0,
        histories: [],
        header: 0,
        header1: 0,
        loading: null
    };


    handlechange = (e) => {
        const { currentTarget: input } = e;
        let s1 = { ...this.state }
        s1.form[input.name] = input.value
        this.setState(s1)
    }
    handlesearch = (e) => {
        const { currentTarget: input } = e;
        let s1 = { ...this.state }
        s1.searches[input.name] = input.value
        this.setState(s1)
    }
    async link(obj) {
        this.setState({ loading: false })
        console.log(obj)
        let starttime = new Date().getTime()
        let { histories } = this.state
        histories.unshift({ fetchurl: obj.fetchurl, method: obj.method })
        if (obj.method == "get") {
            axios.get(obj.fetchurl)
                .then((response) => {
                    console.log(response)
                    let { status, statusText } = response;
                    let header = response.headers;
                    let endtime = new Date().getTime()
                    let s1 = { ...this.state }
                    s1.form.response = response.data;
                    s1.headersdata = header
                    s1.status = status
                    s1.statusText = statusText
                    s1.time = (endtime - starttime)
                    s1.loading = true
                    this.setState(s1)
                })
                .catch((error) => {
                    console.log(error)
                    let { status, statusText } = error.response;
                    let s1 = { ...this.state }
                    let endtime = new Date().getTime()
                    let responsed = statusText ? "Not Found" : error.code;
                    s1.form.response = responsed;
                    s1.status = status
                    s1.statusText = statusText
                    s1.time = (endtime - starttime)
                    s1.loading = true
                    this.setState(s1);
                })
        }
        if (obj.method == "post") {
            let data = obj.data
            let data1 = JSON.parse(data)
            console.log(data1)
            axios.post(obj.fetchurl, data1)
                .then((response) => {
                    let header = response.headers;
                    console.log(response.data);
                    let { status, statusText } = response;
                    let endtime = new Date().getTime()
                    let s1 = { ...this.state }
                    s1.form.response = response.data;
                    s1.headersdata = header
                    s1.status = status
                    s1.statusText = statusText
                    s1.time = (endtime - starttime)
                    s1.loading = true
                    this.setState(s1)
                })
                .catch((error) => {
                    console.log(error)
                    let { status, statusText } = error.response
                    let response = statusText ? "Not Found" : error.code;
                    let s1 = { ...this.state }
                    let endtime = new Date().getTime()
                    s1.form.response = response
                    s1.status = status
                    s1.statusText = statusText
                    s1.time = (endtime - starttime)
                    s1.loading = true
                    this.setState(s1);
                })
        }
    }
    handlesubmit = (e) => {
        e.preventDefault();
        this.link(this.state.form)

    }
    queryparam = () => {
        this.setState({ index: 0 })
    }
    headers = () => {
        this.setState({ index: 2 })
    }
    body = () => {
        this.setState({ index: 3 })
    }
    authorization = () => {
        this.setState({ index: 1 })
    }
    prerequest = () => {
        this.setState({ index: 4 })
    }
    text = () => {
        this.setState({ index: 5 })
    }
    setting = () => {
        this.setState({ index: 6 })
    }
    history = () => {
        this.setState({ history: 1 })
    }
    clearall = () => {
        this.setState({ histories: [] })
    }
    historyclick = (index) => {
        console.log(index)
        let { histories } = this.state
        console.log(histories[index])
        let s1 = this.state
        s1.form.method = histories[index].method
        s1.form.fetchurl = histories[index].fetchurl
        this.setState(s1)
    }
    render() {
        let { fetchurl, data, method, option, key1, key2, key3, value1, value2, value3,
            desc1, desc2, desc3, response } = this.state.form;
        let { search } = this.state.searches

        let { index, status, statusText, time, history, histories, header, header1, loading, headersdata } = this.state;
        console.log(headersdata)
        console.log(loading)
        let options = ["none", "form-data", "x-www--form-url-encoded", "raw", "binary", "GraphQl"]
        let methods = ["get", "post", "put", "delete"]
        console.log(search)
        console.log(histories)
        let histories1 = histories.filter(hr => { return search == "" ? hr : hr.fetchurl.includes(search) })
        console.log(histories1)
        return (
            <div className="">
                <div className="row">
                    <div className={history == "1" ? "col-3" : "col-1"}>
                        {history == "1" ?
                            <div className="row">
                                <hr />
                                <div className="col-1 ms-4" style={{ "font-size": "20px" }}><i class="fa-solid fa-user"></i></div>
                                <div className="col-5"><h6 className="mt-2">My WorkSpace</h6></div>
                                <div className="col-2"><button className="btn btn-light btn-sm ml-2">New</button></div>
                                <div className="col-2"><button className="btn btn-sm btn-light">Import</button></div>
                                <hr className="mt-2" />
                            </div> : ""
                        }

                        <div className={history == "1" ? "row" : ""}>

                            <div className={history == "1" ? "col-4" : ""}>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-auto bg-light sticky-top">
                                            <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
                                                <Link className="d-block p-3 link-dark text-decoration-none" data-toggle="tooltip" data-placement="right" title="Collections" onClick={() => this.setState({ history: 0 })}>
                                                    <div className="text-center" style={{ "font-size": "18px" }}>
                                                        <i className="fa-regular fa-file"></i></div>
                                                    {history == "1" ? <div className="text-muted text-xs" style={{ "font-size": "11px" }}>Collections</div> : ""}

                                                </Link>

                                                <Link className="d-block p-3 link-dark text-decoration-none" data-toggle="tooltip" data-placement="right" title="APIs" onClick={() => this.setState({ history: 0 })} >
                                                    <div className="text-center" style={{ "font-size": "18px" }}><i className="fa-brands fa-react"></i></div>
                                                    {history == "1" ? <div className="text-muted " style={{ "font-size": "11px" }}>APIs</div> : ""}

                                                </Link>
                                                <Link className="d-block p-3 link-dark text-decoration-none" data-toggle="tooltip" data-placement="right" title="Environment" onClick={() => this.setState({ history: 0 })} >
                                                    <div className="text-center" style={{ "font-size": "18px" }}><FontAwesomeIcon icon={faSquareMinus} /></div>
                                                    {history == "1" ? <div className="text-muted" style={{ "font-size": "11px" }}>Environment</div> : ""}

                                                </Link>

                                                <Link className="d-block p-3 link-dark text-decoration-none" data-toggle="tooltip" data-placement="right" title="Mock Servers" onClick={() => this.setState({ history: 0 })} >
                                                    <div className="text-center" style={{ "font-size": "18px" }}><i class="fa-solid fa-server"></i></div>
                                                    {history == "1" ? <div className="text-muted" style={{ "font-size": "11px" }}>MockServer</div> : ""}

                                                </Link>
                                                <Link className="d-block p-3 link-dark text-decoration-none" data-toggle="tooltip" data-placement="right" title="Monitors" onClick={() => this.setState({ history: 0 })} >
                                                    <div className="text-center" style={{ "font-size": "18px" }}><FontAwesomeIcon icon={faAddressBook} /></div>
                                                    {history == "1" ? <div className="text-muted" style={{ "font-size": "11px" }}>Monitors</div> : ""}

                                                </Link>
                                                <Link className="d-block p-3 link-dark text-decoration-none" data-toggle="tooltip" data-placement="right" title="Flows" onClick={() => this.setState({ history: 0 })} >
                                                    <div className="text-center" style={{ "font-size": "18px" }}><FontAwesomeIcon icon={faFileWaveform} /></div>
                                                    {history == "1" ? <div className="text-muted" style={{ "font-size": "11px" }}>Flows</div> : ""}

                                                </Link>
                                                <Link className="d-block p-3 link-dark text-decoration-none" data-toggle="tooltip" data-placement="right" title="History" onClick={() => this.history()}>
                                                    <div className="text-center" style={{ "font-size": "18px" }}><FontAwesomeIcon icon={faTimesCircle} /></div>
                                                    {history == "1" ? <div className="text-muted" style={{ "font-size": "11px" }}>History</div> : ""}

                                                </Link>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {history == 0 ? "" : <div className="col-8">
                                <div className="input-group mb-3 input-group-sm">
                                    <input type="text" className="form-control form-control-sm" id="search" name="search"
                                        placeholder="" onChange={this.handlesearch}
                                        value={search} />

                                    <div class="btn-group btn-sm ms-2">
                                        <text type="" class="btn btn-light " data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                            ...
                                        </text>
                                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                                            <li><button class="dropdown-item" type="button" onClick={() => this.clearall()}>Clear all</button></li>
                                            <li><button class="dropdown-item" type="button">Save Responses</button></li>

                                        </ul>
                                    </div>
                                </div>

                                {histories1.map((ele, index) => (
                                    <div className="row overflow-hidden" onClick={() => this.historyclick(index)}>
                                        <div className="col-2 text-success " style={{ "font-size": "13px" }}><Link className="text-decoration-none text-success">{(ele.method).toUpperCase()}</Link></div>
                                        <div className="col-10" style={{ "font-size": "13px" }}><Link className="text-decoration-none text-dark">{ele.fetchurl}</Link></div>
                                    </div>
                                ))}
                            </div>}
                        </div>
                    </div>
                    <div className={history == 0 ? "col-11 border " : "col-9 border "}>

                        <br />
                        <hr />
                        <div>
                            {fetchurl == "" ? <h6>Untitled Request</h6> : fetchurl}
                        </div>
                        <hr />

                        <div className="row ">
                            <div className="col-3 "></div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <div className="form-group">
                                        <select className="form-select "
                                            name="method" value={method} onChange={this.handlechange}>

                                            {methods.map(ele => {
                                                return (<option>{(ele)}</option>)
                                            })}
                                        </select>
                                    </div>

                                </div>
                                <input type="text" class="form-control" aria-label="Text input with dropdown button"
                                    id="fetchurl" name="fetchurl" placeholder="Enter URL" onChange={this.handlechange}
                                    value={fetchurl} />

                                <button type="button" class="btn btn-primary ms-2" onClick={this.handlesubmit}>Send</button>
                                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="sr-only">Toggle Dropdown</span>
                                </button>
                            </div>
                        </div>

                        <div className="row d-inline">
                            <div className="d-inline "><Link className={index == 0 ? "text-danger text-decoration-underline" : "text-dark text-decoration-none"} onClick={() => this.queryparam()}>Params</Link></div>
                            <div className="d-inline"><Link className={index == 1 ? "text-danger text-decoration-underline" : "text-dark text-decoration-none"} onClick={() => this.authorization()}>Authorization</Link></div>
                            <div className="d-inline"><Link className={index == 2 ? "text-danger text-decoration-underline" : "text-dark text-decoration-none"} onClick={() => this.headers()}>Headers </Link></div>
                            <div className="d-inline"><Link className={index == 3 ? "text-danger text-decoration-underline" : "text-dark text-decoration-none"} onClick={() => this.body()}>Body</Link></div>
                            <div className="d-inline "><Link className={index == 4 ? "text-danger text-decoration-underline" : "text-dark text-decoration-none"} onClick={() => this.prerequest()}>Pre-request Script</Link></div>
                            <div className="d-inline"><Link className={index == 5 ? "text-danger text-decoration-underline" : "text-dark text-decoration-none"} onClick={() => this.text()}>Test</Link></div>
                            <div className="d-inline"><Link className={index == 6 ? "text-danger text-decoration-underline" : "text-dark text-decoration-none"} onClick={() => this.setting()}>Settings</Link></div>
                        </div>
                        <br />
                        <br />
                        <h6>{index == 0 ? "Query Params" : index == 2 ? "Header" : ""}</h6>
                        {index == 3 ? <div>
                            <div className="">
                                {options.map(ele => {
                                    console.log(ele)
                                    return <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="radio"
                                            name="option"
                                            value={ele}
                                            checked={option == ele}
                                            onClick={this.handlechange}
                                        />
                                        <label className="form-check-label"> {ele} </label>
                                    </div>
                                })}
                            </div>
                            <div className="">
                                <div class="form-outline">
                                    <textarea class="form-control"
                                        id="data" name="data" placeholder=""
                                        onChange={this.handlechange} value={data} rows="4" >
                                    </textarea>
                                </div>
                            </div>
                        </div> :
                            index == 2 || index == 0 ? <div className="">
                                <div class="input-group">
                                    <input type="text" class="form-control bg-white" value="KEY" disabled />
                                    <input type="text" class="form-control bg-white" value="VALUE" disabled />
                                    <input type="text" class="form-control bg-white" value="DESCRIPTION" disabled />
                                </div>
                                <div class="input-group">
                                    <input type="text" class="form-control bg-white" id="key1" name="key1"
                                        placeholder="Key" onChange={this.handlechange} value={key1} />
                                    <input type="text" class="form-control bg-white" id="value1" name="value1"
                                        placeholder="Value" onChange={this.handlechange} value={value1} />
                                    <input type="text" class="form-control bg-white" id="desc1" name="desc1"
                                        placeholder="Description" onChange={this.handlechange} value={desc1} />
                                </div>
                                {(key1 != "" || value1 != "" || desc1 != "") ?
                                    <div class="input-group">
                                        <input type="text" class="form-control bg-white" id="key2" name="key2"
                                            placeholder="Key" onChange={this.handlechange} value={key2} />
                                        <input type="text" class="form-control bg-white" id="value2" name="value2"
                                            placeholder="Value" onChange={this.handlechange} value={value2} />
                                        <input type="text" class="form-control bg-white" id="desc2" name="desc2"
                                            placeholder="Description" onChange={this.handlechange} value={desc2} />
                                    </div>
                                    : ""}
                                {(key2 != "" || value2 != "" || desc2 != "") ?
                                    <div class="input-group">
                                        <input type="text" class="form-control bg-white" id="key3" name="key3"
                                            placeholder="Key" onChange={this.handlechange} value={key3} />
                                        <input type="text" class="form-control bg-white" id="value3" name="value3"
                                            placeholder="Value" onChange={this.handlechange} value={value2} />
                                        <input type="text" class="form-control bg-white" id="desc3" name="desc3"
                                            placeholder="Description" onChange={this.handlechange} value={desc3} />
                                    </div>
                                    : ""}
                            </div> : ""}
                        <br />
                        <div className="">
                            <hr />
                            {loading == false ?
                                <div class="d-flex justify-content-center">
                                    <div class="spinner-border" role="status">
                                    </div>
                                    <div className="text-center ms-2">Sending Request...</div>
                                </div> : ""
                            }
                            {response == "" || response == "ERR_NETWORK" || response == "ERR_INVALID_URL" || response == "ENOTFOUND" ? <div className="col-1 ms-3" style={loading == false ? { "filter": "blur(1px)" } : {}}>Response</div> :
                                <div style={loading == false ? { "filter": "blur(1px)" } : {}}>
                                    <div className="row">
                                        <div className="col-7">
                                            <div className="row d-inline">
                                                <div className="d-inline "><Link className={header == 0 ? "text-danger text-decoration-underline" : "text-dark text-decoration-none"} style={{ "text-size": "15px" }} onClick={() => this.setState({ header: 0 })}>Body</Link></div>
                                                <div className="d-inline"><Link className={header == 1 ? "text-danger text-decoration-underline" : "text-dark text-decoration-none"} onClick={() => this.setState({ header: 1 })}>Cookies</Link></div>
                                                <div className="d-inline"><Link className={header == 2 ? "text-danger text-decoration-underline" : "text-dark text-decoration-none"} onClick={() => this.setState({ header: 2 })}>Headers</Link></div>
                                                <div className="d-inline"><Link className={header == 3 ? "text-danger text-decoration-underline" : "text-dark text-decoration-none"} onClick={() => this.setState({ header: 3 })}>Test Results</Link></div>
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <div className="row d-inline">
                                                <div className="d-inline "><i className="fa-solid fa-globe"></i></div>
                                                <div className="d-inline " style={{ "font-size": "13px" }} >Status : <div className="text-success d-inline">{status} {statusText}</div></div>
                                                <div className="d-inline " style={{ "font-size": "13px" }} >Time : <div className="text-success d-inline">{time} ms</div></div>
                                                <div className="d-inline">
                                                    <div class="btn-group btn-sm ">
                                                        <text type="button" class="btn btn-light btn-sm dropdown-toggle text-primary" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                                            Save Response
                                                        </text>
                                                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                                                            <li><button class="dropdown-item" type="button" disabled>Save as Example</button></li>
                                                            <li><button class="dropdown-item" type="button">Save to a file</button></li>

                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        {header != 2 ?
                                            <div class="btn-group btn-group-toggle btn-group-sm" data-toggle="buttons">
                                                <button class={header1 == 0 ? "btn btn-light active" : "btn btn-light"} onClick={() => this.setState({ header1: 0 })}>
                                                    Pretty
                                                </button>
                                                <button class={header1 == 1 ? "btn btn-light active" : "btn btn-light"} onClick={() => this.setState({ header1: 1 })}>
                                                    Raw
                                                </button>
                                                <button class={header1 == 2 ? "btn btn-light active" : "btn btn-light"} onClick={() => this.setState({ header1: 2 })}>
                                                    Preview
                                                </button>
                                                <button class={header1 == 3 ? "btn btn-light active" : "btn btn-light"} onClick={() => this.setState({ header1: 3 })}>
                                                    Visualize
                                                </button>
                                                {header1 != 0 ? "" :
                                                    <div className="form-group form-group-sm ms-2 bg-light">
                                                        <select className="form-control form-control-sm">
                                                            <option> Text</option>
                                                            <option> JSON</option>
                                                            <option> XML</option>
                                                            <option> HTML</option>
                                                            <option> AUTO</option>
                                                        </select>
                                                    </div>
                                                }
                                            </div> : ""}
                                    </div>
                                </div>}

                            <div className="mt-2">
                                {header != 2 ? <div class="form" style={loading == false ? { "filter": "blur(1px)" } : {}}>
                                    <textarea class="form-control"
                                        id="response" name="response" placeholder=""
                                        onChange={this.handlechange}
                                        value={response == "" ? "" : response.code == "ERR_INVALID_URL" || response.code == "ENOTFOUND" ? "Invalid URL" : response == "Not Found" ? "Not Found" : JSON.stringify(response)} rows="7">
                                    </textarea>
                                </div> :
                                    <div className="fluid" style={loading == false ? { "filter": "blur(1px)" } : {}}>
                                        <div className="row ms-1 me-1 ">
                                            <div className="col-1 border "></div>
                                            <div className="col-5 border"><h6>Key</h6></div>
                                            <div className="col-6 border"><h6>Value</h6></div>
                                        </div>
                                        {headersdata["server"] ? <div className="row ms-1 me-1 ">
                                            <div className="col-1 border "></div>
                                            <div className="col-5 border">Server</div>
                                            <div className="col-6 border">{headersdata["server"]}</div>
                                        </div> : ""}
                                        {headersdata["connection"] ? <div className="row ms-1 me-1 ">
                                            <div className="col-1 border "></div>
                                            <div className="col-5 border">Connection</div>
                                            <div className="col-6 border">{headersdata["connection"]}</div>
                                        </div> : ""}
                                        {headersdata["x-powered-by"] ? <div className="row ms-1 me-1 ">
                                            <div className="col-1 border "></div>
                                            <div className="col-5 border">X-Powered-By</div>
                                            <div className="col-6 border">{headersdata["x-powered-by"]}</div>
                                        </div> : ""}
                                        {headersdata["access-control-allow-origin"] ? <div className="row ms-1 me-1 ">
                                            <div className="col-1 border "></div>
                                            <div className="col-5 border">Access-Control-Allow-Origin</div>
                                            <div className="col-6 border">{headersdata["access-control-allow-origin"]}</div>
                                        </div> : ""}
                                        {headersdata["access-control-allow-methods"] ?
                                            <div className="row ms-1 me-1 ">
                                                <div className="col-1 border "></div>
                                                <div className="col-5 border">Access-Control-Allow-Methods</div>
                                                <div className="col-6 border">{headersdata["access-control-allow-methods"]}</div>
                                            </div> : ""}
                                        {headersdata["access-control-allow-headers"] ? <div className="row ms-1 me-1 ">
                                            <div className="col-1 border "></div>
                                            <div className="col-5 border">Access-Control-Allow-Headers</div>
                                            <div className="col-6 border">{headersdata["access-control-allow-headers"]}</div>
                                        </div> : ""}
                                        {headersdata["content-type"] ? <div className="row ms-1 me-1 ">
                                            <div className="col-1 border "></div>
                                            <div className="col-5 border">Content-Type</div>
                                            <div className="col-6 border">{headersdata["content-type"]}</div>
                                        </div> : ""}
                                        {headersdata["content-length"] ? <div className="row ms-1 me-1 ">
                                            <div className="col-1 border "></div>
                                            <div className="col-5 border">Content-Length</div>
                                            <div className="col-6 border">{headersdata["content-length"]}</div>
                                        </div> : ""}
                                        {headersdata["etag"] ? <div className="row ms-1 me-1 ">
                                            <div className="col-1 border "></div>
                                            <div className="col-5 border">Etag</div>
                                            <div className="col-6 border">{headersdata["etag"]}</div>
                                        </div> : ""}
                                        {headersdata["date"] ? <div className="row ms-1 me-1 ">
                                            <div className="col-1 border "></div>
                                            <div className="col-5 border">Date</div>
                                            <div className="col-6 border">{headersdata["date"]}</div>
                                        </div> : ""}
                                        {headersdata["via"] ? <div className="row ms-1 me-1 ">
                                            <div className="col-1 border "></div>
                                            <div className="col-5 border">Via</div>
                                            <div className="col-6 border">{headersdata["via"]}</div>
                                        </div> : ""}

                                    </div>}
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        )

    }

}
export default Home1;
