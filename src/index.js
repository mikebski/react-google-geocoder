import React from 'react';
import PropTypes from 'prop-types'
import './geo-coder.css';

const STATE = {
    ONE_FOUND: "one-found",
    MULTIPLE_FOUND: "multiple-found",
    NONE_FOUND: "none-found",
    REQUEST_DENIED: "request-denied",
    REQUEST_ERROR: "request-error",
    SEARCHING: "searching",
    READY: "ready"
}

class GeoCoderAcceptButton extends React.Component {
    render() {
        return (
            <button className={this.props.acceptButtonClass}
                    disabled={this.props.disabled} type="button"
                    onClick={(event) => {
                        this.props.onClick(event)
                    }}>{this.props.acceptButtonLabel}
            </button>
        )
    }
}

class GeoCoderResetButton extends React.Component {
    render() {
        return (
            <button className={this.props.resetButtonClass} disabled={this.props.disabled} type="button"
                    onClick={(event) => {
                        this.props.onClick(event)
                    }}>{this.props.resetButtonLabel}
            </button>
        )
    }
}

class GeoCoderSearchButton extends React.Component {
    render() {
        return (
            <button className={this.props.searchButtonClass}
                    disabled={this.props.disabled} type="button"
                    onClick={(event) => {
                        this.props.onClick(event)
                    }}>{this.props.searchButtonLabel}
            </button>
        )
    }
}

class GeoCoderSelectButton extends React.Component {
    render() {
        return (
            <button className={this.props.selectButtonClass}
                    type="button"
                    onClick={(event) => {
                        this.props.onClick(event)
                    }}>{this.props.selectButtonLabel}
            </button>
        )
    }
}
class GeoCoderInput extends React.Component {
    render() {
        const inputId = 'geo-coder-' + new Date().valueOf()
        return (
            <div className={this.props.inputLabelWrapperClass}>
                <label className={this.props.labelClass}
                       htmlFor={inputId}><span>{this.props.fieldLabel}</span></label>
                <input className={this.props.inputClass} id={inputId} disabled={this.props.searching}
                       value={this.props.address}
                       onChange={(event) => this.props.onChange(event.target.value)}/>
            </div>
        )
    }
}

class GeoCoder extends React.Component {
    static DEFAULT_STATE() {
        return {
            address: "",
            foundAddresses: [],
            api_status: null,
            state: STATE.READY,
            searching: false
        }
    }

    constructor(props) {
        super(props)
        this.changeAddress = this.changeAddress.bind(this)
        this.searchAddress = this.searchAddress.bind(this)
        this.resetButton = this.resetButton.bind(this)
        this.state = GeoCoder.DEFAULT_STATE()
    }

    changeAddress(val) {
        this.setState({
            address: val
        })
    }

    searchAddress(addressFromForm) {
        this.setState({
            status: null,
            foundAddresses: [],
            searching: true
        })
        const component = this;
        fetch("https://maps.googleapis.com/maps/api/geocode/json?key=" + this.props.apiKey + "&address=" + encodeURIComponent(addressFromForm)).then(
            (response) => {
                response.json()
                    .then(function (myJson) {
                        console.log("JSON from API", myJson);
                        if (myJson.status === "OK") {
                            const results = myJson.results

                            var finalResults = myJson.results
                            var finalAddress = addressFromForm
                            var theState = STATE.MULTIPLE_FOUND
                            var fi = null
                            if (results.length === 0) {
                                finalResults = []
                                finalAddress = addressFromForm
                                theState = STATE.NONE_FOUND
                            } else if (results.length === 1) {
                                finalResults = results
                                finalAddress = myJson.results[0].formatted_address
                                fi = myJson.results[0]
                                theState = STATE.ONE_FOUND
                            }
                            component.setState({
                                address: finalAddress,
                                foundAddresses: finalResults,
                                api_status: myJson.status,
                                finalItem: fi,
                                state: theState,
                            })
                        } else {
                            component.setState({
                                state: STATE.REQUEST_ERROR,
                            })
                        }
                    });
            }).catch((error) => {
                component.setState({
                    state: STATE.REQUEST_ERROR,
                })
                console.log("Error", error)
            }
        ).finally(() => {
                component.setState({searching: false})
            }
        )
    }

    resetButton() {
        return (
            <this.props.resetButton disabled={false} {...this.props}
                                    onClick={(event) => {
                                        this.setState(GeoCoder.DEFAULT_STATE())
                                    }}/>
        )
    }

    render() {
        const component = this
        return (
            <div style={{width: "350px"}}>
                {this.props.showFormTitle ? <h2>{this.props.formTitle}</h2> : null}
                <form className={this.props.formClass}>
                    <fieldset>
                        {this.state.state === STATE.REQUEST_ERROR ?
                            <p className={this.props.errorMessageClass}>{this.props.errorMessage}</p> : null}
                        <this.props.input {...this.props} onChange={this.changeAddress} searching={this.state.searching}
                                          address={this.state.address}/>
                    </fieldset>
                    <div className={this.props.formButtonWrapperClass}>
                        <this.props.searchButton {...this.props}
                                                 onClick={(event) => {
                                                     component.searchAddress(component.state.address)
                                                 }}
                                                 disabled={this.state.searching || this.state.state === STATE.ONE_FOUND}
                        />
                        {this.resetButton()}
                        <this.props.acceptButton {...this.props}
                                                 onClick={(event) => this.props.onAddressAccept(component.state.foundAddresses[0])}
                                                 disabled={this.state.state !== STATE.ONE_FOUND}
                        />
                    </div>
                </form>
                {component.state.state === STATE.MULTIPLE_FOUND ?
                    <div className="overlay">
                        <table className={this.props.tableClass + " popup"}>
                            <thead>
                            <tr>
                                <th colSpan="2">
                                    Results For: {this.state.address}
                                </th>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    {this.resetButton()}
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            {component.state.foundAddresses.map((val, key) =>
                                <tr key={"id_" + key}>
                                    <td>
                                        {val.formatted_address}
                                    </td>
                                    <td>
                                        <this.props.selectButton {...this.props}
                                                                 onClick={(event) => component.setState({
                                                                     address: val.formatted_address,
                                                                     foundAddresses: [val],
                                                                     finalItem: val,
                                                                     state: STATE.ONE_FOUND
                                                                 })}
                                                                 disabled={false}
                                                                 type="button"
                                        />
                                    </td>
                                </tr>
                            )
                            }
                            <tr>
                                <td colSpan="2">
                                    {this.resetButton()}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div> : null}

            </div>
        )
    }
}

GeoCoder.propTypes = {
    apiKey: PropTypes.string.isRequired,
    searchButtonLabel: PropTypes.string,
    resetButtonLabel: PropTypes.string,
    selectButtonLabel: PropTypes.string,
    acceptButtonLabel: PropTypes.string,

    searchButtonClass: PropTypes.string,
    resetButtonClass: PropTypes.string,
    selectButtonClass: PropTypes.string,
    acceptButtonClass: PropTypes.string,

    errorMessage: PropTypes.string,
    errorMessageClass: PropTypes.string,

    formTitle: PropTypes.string,
    showFormTitle: PropTypes.bool,
    formClass: PropTypes.string,
    tableClass: PropTypes.string,
    fieldLabel: PropTypes.string,
    inputLabelWrapperClass: PropTypes.string,
    formButtonWrapperClass: PropTypes.string,
    inputClass: PropTypes.string,
    labelClass: PropTypes.string,
    onAddressAccept: PropTypes.func,

    input: PropTypes.element,
    searchButton: PropTypes.element,
    resetButton: PropTypes.element,
    acceptButton: PropTypes.element,
    selectButton: PropTypes.element,
}

GeoCoder.defaultProps = {
    searchButtonLabel: "Search",
    resetButtonLabel: "Reset",
    selectButtonLabel: "Select",
    acceptButtonLabel: "Accept",

    searchButtonClass: "geo-code-button geo-code-search-button",
    resetButtonClass: "geo-code-button geo-code-reset-button",
    selectButtonClass: "geo-code-button geo-code-select-button",
    acceptButtonClass: "geo-code-button geo-code-accept-button",

    errorMessage: "There was an error",
    errorMessageClass: "geo-code-error",

    formTitle: "Search for Address",
    showFormTitle: true,
    fieldLabel: "Address",
    formClass: "geo-code-form",
    tableClass: "geo-code-table",
    inputLabelWrapperClass: "geo-code-input-and-label",
    formButtonWrapperClass: "geo-code-form-button-wrapper",
    onAddressAccept: (value) => alert("Accepted: " + JSON.stringify(value)),
    inputClass: "geo-code-input",
    labelClass: "geo-code-label",

    input: GeoCoderInput,
    searchButton: GeoCoderSearchButton,
    resetButton: GeoCoderResetButton,
    acceptButton: GeoCoderAcceptButton,
    selectButton: GeoCoderSelectButton
}

export default GeoCoder

