import React from 'react';

import './Chart.css';

const Chart = React.forwardRef((props, ref) => (
    <svg className="Chart" ref={ref}></svg>
));

export default Chart;
