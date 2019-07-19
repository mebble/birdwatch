import React from 'react';

const icons = {
    verified: {
        paths: (
            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5c-1.51 0-2.816.917-3.437 2.25-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
        ),
        viewBox: '0 0 24 24'
    },
    twitter: {
        paths: (
            <path d="M403.632,74.18c-9.113,4.041-18.573,7.229-28.28,9.537c10.696-10.164,18.738-22.877,23.275-37.067  l0,0c1.295-4.051-3.105-7.554-6.763-5.385l0,0c-13.504,8.01-28.05,14.019-43.235,17.862c-0.881,0.223-1.79,0.336-2.702,0.336  c-2.766,0-5.455-1.027-7.57-2.891c-16.156-14.239-36.935-22.081-58.508-22.081c-9.335,0-18.76,1.455-28.014,4.325  c-28.672,8.893-50.795,32.544-57.736,61.724c-2.604,10.945-3.309,21.9-2.097,32.56c0.139,1.225-0.44,2.08-0.797,2.481  c-0.627,0.703-1.516,1.106-2.439,1.106c-0.103,0-0.209-0.005-0.314-0.015c-62.762-5.831-119.358-36.068-159.363-85.14l0,0  c-2.04-2.503-5.952-2.196-7.578,0.593l0,0C13.677,65.565,9.537,80.937,9.537,96.579c0,23.972,9.631,46.563,26.36,63.032  c-7.035-1.668-13.844-4.295-20.169-7.808l0,0c-3.06-1.7-6.825,0.485-6.868,3.985l0,0c-0.438,35.612,20.412,67.3,51.646,81.569  c-0.629,0.015-1.258,0.022-1.888,0.022c-4.951,0-9.964-0.478-14.898-1.421l0,0c-3.446-0.658-6.341,2.611-5.271,5.952l0,0  c10.138,31.651,37.39,54.981,70.002,60.278c-27.066,18.169-58.585,27.753-91.39,27.753l-10.227-0.006  c-3.151,0-5.816,2.054-6.619,5.106c-0.791,3.006,0.666,6.177,3.353,7.74c36.966,21.513,79.131,32.883,121.955,32.883  c37.485,0,72.549-7.439,104.219-22.109c29.033-13.449,54.689-32.674,76.255-57.141c20.09-22.792,35.8-49.103,46.692-78.201  c10.383-27.737,15.871-57.333,15.871-85.589v-1.346c-0.001-4.537,2.051-8.806,5.631-11.712c13.585-11.03,25.415-24.014,35.16-38.591  l0,0C411.924,77.126,407.866,72.302,403.632,74.18L403.632,74.18z" />
        ),
        viewBox: '0 0 410.155 410.155',
        attribution: <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    },
    cross: {
        paths: (
            <path d="M213.333,0C95.514,0,0,95.514,0,213.333s95.514,213.333,213.333,213.333  s213.333-95.514,213.333-213.333S331.153,0,213.333,0z M330.995,276.689l-54.302,54.306l-63.36-63.356l-63.36,63.36l-54.302-54.31  l63.356-63.356l-63.356-63.36l54.302-54.302l63.36,63.356l63.36-63.356l54.302,54.302l-63.356,63.36L330.995,276.689z" />
        ),
        viewBox: '0 0 426.667 426.667',
        attribution: <div>Icons made by <a href="https://www.flaticon.com/authors/maxim-basinski" title="Maxim Basinski">Maxim Basinski</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    },
    question: {
        paths: (
            <path d="m22,0c-12.2,0-22,9.8-22,22s9.8,22 22,22 22-9.8 22-22-9.8-22-22-22zm2,34c0,0.6-0.4,1-1,1h-2c-0.6,0-1-0.4-1-1v-2c0-0.6 0.4-1 1-1h2c0.6,0 1,0.4 1,1v2zm2.7-8.9c-1.4,1.2-2.4,2-2.7,3.1-0.1,0.5-0.5,0.8-1,0.8h-2c-0.6,0-1.1-0.5-1-1.1 0.4-2.9 2.5-4.5 4.2-5.9 1.8-1.4 2.8-2.3 2.8-4 0-2.8-2.2-5-5-5s-5,2.2-5,5c0,0.2 0,0.4 0,0.6 0.1,0.5-0.2,1-0.7,1.1l-1.9,.6c-0.6,0.2-1.2-0.2-1.3-0.8-0.1-0.5-0.1-1-0.1-1.5 0-5 4-9 9-9s9,4 9,9c0,3.7-2.4,5.6-4.3,7.1z" />
        ),
        viewBox: '0 0 44 44',
        attribution: <div>Icons made by <a href="https://www.flaticon.com/authors/eleonor-wang" title="Eleonor Wang">Eleonor Wang</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    },
    permalink: {
        paths: (
            <>
                <path d="M149.996,0C67.157,0,0.001,67.161,0.001,149.997S67.157,300,149.996,300s150.003-67.163,150.003-150.003     S232.835,0,149.996,0z M225.363,123.302l-36.686,36.686c-3.979,3.979-9.269,6.17-14.895,6.17c-5.625,0-10.916-2.192-14.895-6.168     l-1.437-1.437l-3.906,3.906l1.434,1.434c8.214,8.214,8.214,21.579,0,29.793l-36.681,36.686c-3.979,3.979-9.269,6.17-14.898,6.17     c-5.628,0-10.919-2.192-14.9-6.173L74.634,216.5c-8.214-8.209-8.214-21.573-0.003-29.79l36.689-36.684     c3.979-3.979,9.269-6.17,14.898-6.17s10.916,2.192,14.898,6.17l1.432,1.432l3.906-3.906l-1.432-1.432     c-8.214-8.211-8.214-21.576-0.005-29.79l36.689-36.686c3.981-3.981,9.272-6.173,14.898-6.173s10.916,2.192,14.898,6.17     l13.868,13.873C233.577,101.723,233.577,115.09,225.363,123.302z" />
                <path d="M142.539,173.459l-7.093,7.093l-11.002-10.999l7.093-7.093l-1.432-1.432c-1.04-1.037-2.422-1.611-3.89-1.611     c-1.471,0-2.853,0.573-3.893,1.611l-36.686,36.681c-2.145,2.147-2.145,5.638,0,7.783l13.87,13.873     c2.083,2.083,5.708,2.08,7.786,0.003l36.681-36.686c2.148-2.147,2.148-5.641,0-7.789L142.539,173.459z" />
                <path d="M200.493,90.643c-1.04-1.04-2.425-1.613-3.896-1.613c-1.471,0-2.856,0.573-3.896,1.616l-36.686,36.684     c-2.142,2.147-2.142,5.638,0.003,7.786l1.434,1.432l10.88-10.883l11.002,11.002l-10.88,10.883l1.434,1.434     c2.083,2.077,5.703,2.08,7.786-0.003l36.684-36.681c2.145-2.147,2.145-5.638,0-7.786L200.493,90.643z" />
            </>
        ),
        viewBox: '0 0 300 300',
        attribution: <div>Icons made by <a href="https://www.flaticon.com/authors/chanut" title="Chanut">Chanut</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    },
    barchart: {
        paths: (
            <path d="M30.328,0H0.001v454.886v30.326h30.327h454.884v-30.326h-90.976v-30.327h-30.327v30.327h-60.653v-30.327h-30.322v30.327   h-60.65v-30.327h-30.327v30.327h-60.651v-30.327H90.979v30.327H30.328V0z M212.283,333.584v60.652H60.652v-60.652H212.283z    M303.256,242.606v60.651H60.652v-60.651H303.256z M394.236,151.628v60.653H60.652v-60.653H394.236z M485.212,60.651v60.653H60.652   V60.651H485.212z" />
        ),
        viewBox: '0 0 485.213 485.212',
        attribution: <div>Icons made by <a href="https://www.flaticon.com/authors/simpleicon" title="SimpleIcon">SimpleIcon</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    },
    textbox: {
        paths: (
            <path d="m472 .5h-344c-13.238281.039062-23.960938 10.761719-24 24v48h-80c-13.238281.039062-23.9609375 10.761719-24 24v176c.0390625 13.238281 10.761719 23.960938 24 24h44.640625l45.359375 45.679688c1.519531 1.480468 3.558594 2.3125 5.679688 2.320312 1.070312-.019531 2.128906-.238281 3.121093-.640625 3.007813-1.230469 4.949219-4.1875 4.878907-7.4375l-.238282-39.921875h240.558594c13.238281-.039062 23.960938-10.761719 24-24v-48h80c13.238281-.039062 23.960938-10.761719 24-24v-176c-.039062-13.238281-10.761719-23.960938-24-24zm-96 272c0 4.417969-3.582031 8-8 8h-248.640625c-2.136719.007812-4.183594.875-5.679687 2.398438-1.519532 1.496093-2.355469 3.550781-2.320313 5.679687l.242187 28.402344-33.921874-34.160157c-1.523438-1.472656-3.558594-2.304687-5.679688-2.320312h-48c-4.417969 0-8-3.582031-8-8v-176c0-4.417969 3.582031-8 8-8h344c4.417969 0 8 3.582031 8 8zm104-72c0 4.417969-3.582031 8-8 8h-80v-112c-.039062-13.238281-10.761719-23.960938-24-24h-248v-48c0-4.417969 3.582031-8 8-8h344c4.417969 0 8 3.582031 8 8zm0 0" />
        ),
        viewBox: '0 -75 496 495',
        attribution: <div>Icons made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    },
    github: {
        paths: (
            <path d="M409.132,114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736,15.166,259.057,5.365,219.271,5.365   c-39.781,0-76.472,9.804-110.063,29.408c-33.596,19.605-60.192,46.204-79.8,79.8C9.803,148.168,0,184.854,0,224.63   c0,47.78,13.94,90.745,41.827,128.906c27.884,38.164,63.906,64.572,108.063,79.227c5.14,0.954,8.945,0.283,11.419-1.996   c2.475-2.282,3.711-5.14,3.711-8.562c0-0.571-0.049-5.708-0.144-15.417c-0.098-9.709-0.144-18.179-0.144-25.406l-6.567,1.136   c-4.187,0.767-9.469,1.092-15.846,1c-6.374-0.089-12.991-0.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559   c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559   c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997   c-0.572-1.335-0.098-2.43,1.427-3.289c1.525-0.859,4.281-1.276,8.28-1.276l5.708,0.853c3.807,0.763,8.516,3.042,14.133,6.851   c5.614,3.806,10.229,8.754,13.846,14.842c4.38,7.806,9.657,13.754,15.846,17.847c6.184,4.093,12.419,6.136,18.699,6.136   c6.28,0,11.704-0.476,16.274-1.423c4.565-0.952,8.848-2.383,12.847-4.285c1.713-12.758,6.377-22.559,13.988-29.41   c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126   c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035,7.52-42.637,22.557-58.817   c-7.044-17.318-6.379-36.732,1.997-58.24c5.52-1.715,13.706-0.428,24.554,3.853c10.85,4.283,18.794,7.952,23.84,10.994   c5.046,3.041,9.089,5.618,12.135,7.708c17.705-4.947,35.976-7.421,54.818-7.421s37.117,2.474,54.823,7.421l10.849-6.849   c7.419-4.57,16.18-8.758,26.262-12.565c10.088-3.805,17.802-4.853,23.134-3.138c8.562,21.509,9.325,40.922,2.279,58.24   c15.036,16.18,22.559,35.787,22.559,58.817c0,16.178-1.958,30.497-5.853,42.966c-3.9,12.471-8.941,22.457-15.125,29.979   c-6.191,7.521-13.901,13.85-23.131,18.986c-9.232,5.14-18.182,8.85-26.84,11.136c-8.662,2.286-18.415,4.004-29.263,5.146   c9.894,8.562,14.842,22.077,14.842,40.539v60.237c0,3.422,1.19,6.279,3.572,8.562c2.379,2.279,6.136,2.95,11.276,1.995   c44.163-14.653,80.185-41.062,108.068-79.226c27.88-38.161,41.825-81.126,41.825-128.906   C438.536,184.851,428.728,148.168,409.132,114.573z" />
        ),
        viewBox: '0 0 438.549 438.549',
        attribution: <div>Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    }
};

export default ({ name, fill="#000", width=24, height=24 }) => {
    const { paths, viewBox } = icons[name];
    return (
        <svg className="Icon" width={width} height={height} viewBox={viewBox} style={{ fill }}>
            {paths}
        </svg>
    );
};
