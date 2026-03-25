import React from 'react';

type State = {
  today: Date;
  clockName: string;
};

type Props = {
  getRandomName: () => string;
};

export class Clock extends React.Component<Props, State> {
  state: State = {
    today: new Date(),
    clockName: 'Clock-0',
  };

  // Tipagem robusta para evitar erros de compilação em testes
  timerId: ReturnType<typeof setInterval> | null = null;
  clockTimerId: ReturnType<typeof setInterval> | null = null;

  componentDidMount(): void {
    // Timer para atualizar o relógio a cada segundo
    this.clockTimerId = setInterval(() => {
      // eslint-disable-next-line no-console
      console.log(this.state.today.toUTCString().slice(-12, -4));

      this.setState({ today: new Date() });
    }, 1000);

    // Timer para mudar o nome do relógio
    this.timerId = setInterval(() => {
      this.setState({ clockName: this.props.getRandomName() });
    }, 3300);
  }

  componentDidUpdate(
    _prevProps: Readonly<Props>,
    prevState: Readonly<State>,
  ): void {
    // Log apenas quando o nome mudar
    if (prevState.clockName !== this.state.clockName) {
      // eslint-disable-next-line no-console
      console.log(
        `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
      );
    }
  }

  componentWillUnmount(): void {
    // Limpeza obrigatória dos intervalos
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    if (this.clockTimerId) {
      clearInterval(this.clockTimerId);
    }
  }

  render() {
    const { clockName, today } = this.state;

    return (
      <div className="Clock">
        <strong className="Clock__name">{clockName}</strong>

        {' time is '}

        <span className="Clock__time">
          {today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
