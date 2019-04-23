

// форма для хранения данных класса Task

export class Task {
  constructor(public id: number,
              public title: string,
              public completed: boolean = false) {}
}

