# react-google-geocoder

## License ##

Copyright (c) 2014-2018 Mike Baranski <http://www.mikeski.net>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS|
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## About

**react-google-geocoder** gives you a text input that allows input validation and
geo-location of an address via the Google Geo Location API.

If there are multiple results returned, they are displayed as a list and one can be 
selected.  Once a unique address is located, the component will call a callback with
all of the available address information.

See the demo [https://mikebski.github.io/react-google-geocoder-demo/](https://mikebski.github.io/react-google-geocoder-demo/)

## Installation

Install using NPM:

`npm install react-google-geocoder --save`

You need to get a Google API credential that has GeoCoding enabled.  See 
[https://developers.google.com/maps/documentation/geocoding/get-api-key](https://developers.google.com/maps/documentation/geocoding/get-api-key)
for information on how to get a key. 

### Note on Credential

For local development with an npm server, for some reason this setup requires a "server" key
instead of a credential that is restricted by referrer.  If you get errors about needing server
credentials without referrer restrictions, generate a new server credential.

## Usage

Minimal usage is something like this:

`<GeoCoder apiKey="REPLACE_WITY_YOUR_GOOGLE_API_KEY"/>`

See the Options below for all available options

## Options


|Property|Type|Default Value|Description|
|--------|----|-----------|-------------|
|apiKey|PropTypes.string.isRequired|**None**|Your Google API key|
|searchButtonLabel|PropTypes.string|`Search`|Label for "Search" button|
|resetButtonLabel|PropTypes.string|`Reset`|Label for "Reset" button|
|selectButtonLabel|PropTypes.string|`Select`|Label for "Select" button|
|acceptButtonLabel|PropTypes.string|`Accept`|Label for "Accept" button|
|searchButtonClass|PropTypes.string|`geo-code-button geo-code-search-button`|CSS class for "Search" button|
|resetButtonClass|PropTypes.string|`geo-code-button geo-code-reset-button`|CSS class for "Reset" button|
|selectButtonClass|PropTypes.string|`geo-code-button geo-code-select-button`|CSS class for "Select" button|
|acceptButtonClass|PropTypes.string|`geo-code-button geo-code-accept-button`|CSS class for "Accept" button|
|errorMessage|PropTypes.string|`There was an error`|Error message text|
|errorMessageClass|PropTypes.string|`geo-code-error`|CSS class for error message|
|formTitle|PropTypes.string|`Search for Address`|Title of form|
|showFormTitle|PropTypes.bool|`true`|Should show form title?|
|formClass|PropTypes.string|`geo-code-form`|CSS class for form|
|tableClass|PropTypes.string|`geo-code-table`|CSS class for address list table|
|fieldLabel|PropTypes.string|`Address`|Label for address field|
|inputLabelWrapperClass|PropTypes.string|`geo-code-input-and-label`|CSS class for input and label wrapper|
|formButtonWrapperClass|PropTypes.string|`geo-code-form-button-wrapper`|CSS class for wrapper for form buttons|
|inputClass|PropTypes.string|`geo-code-input`|CSS class for input|
|labelClass|PropTypes.string|`geo-code-label`|CSS class for label|
|onAddressAccept|PropTypes.func|` (value) => alert("Accepted: " + JSON.stringify(value))`|Method to call when "Accept" is clicked, this gets passed the address information|
|input|PropTypes.element|`GeoCoderInput`|Input to use for the form|
|searchButton|PropTypes.element|`GeoCoderSearchButton`|Search button to use for the form|
|input|PropTypes.element|`GeoCoderInput`|Input to use for the form, see the demo page for how to do this|
|searchButton|PropTypes.element|`GeoCoderSearchButton`|Button to use for search|
|resetButton|PropTypes.element|`GeoCoderResetButton`|Button to use for reset|
|acceptButton|PropTypes.element|`GeoCoderAcceptButton`|Button to use for accept|
|selectButton|PropTypes.element|`GeoCoderSelectButton`|Button to use for select|

## Help

Create an issue here for help
