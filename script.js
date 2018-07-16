class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.running = false;
        this.reset();
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }


    render() {
        return (
            <div>
                <nav className="controls">
                    <Button onClick={this.start.bind(this)}>Start</Button>
                    <Button onClick={this.stop.bind(this)}>Stop</Button>
                </nav>
                <div className="stopwatch">
                    {this.format(this.state.times)}
                </div>
            </div>
        );
    }
}

const Button = (props) => (
    <button onClick = {props.onClick} > {props.children} </button>
);

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const appRoot = document.getElementById('app');
ReactDOM.render( < Stopwatch / > , appRoot);
