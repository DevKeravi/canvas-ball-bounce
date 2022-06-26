import Circle from './circle';
import Shape from './shape';
import Vector from './vector';

// OPTIONS
export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 500;
const MAX_BALL_COUNT = 20;
const MIN_BALL_COUNT = 10;
const MAX_BALL_RADIUS = 20;
const MIN_BALL_RADIUS = 10;
const MIN_BALL_SPEED = 200;
const MAX_BALL_SPEED = 400;

const getRandomRangeNumber = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  delta: number = 0;
  startTime: number;
  frameRequestHandle: number;
  circles: Array<Circle> = [];

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;

    this.startTime = Date.now();

    const ballCount = getRandomRangeNumber(MIN_BALL_COUNT, MAX_BALL_COUNT);

    for (let i = 0; i < ballCount; i++) {
      this.createCircle();
    }
    this.frameRequestHandle = window.requestAnimationFrame(this.fixedUpdate);
    document.body.appendChild(this.canvas);
  }

  createCircle = () => {
    const radius: number = getRandomRangeNumber(
      MIN_BALL_RADIUS,
      MAX_BALL_RADIUS
    );

    const position: Vector = {
      x: getRandomRangeNumber(radius * 2, CANVAS_WIDTH - radius * 2),
      y: getRandomRangeNumber(radius * 2, CANVAS_HEIGHT - radius * 2),
    };

    // 중복위치 방지
    for (let i = 0; i < this.circles.length; i++) {
      const dx = this.circles[i].getPosition().x - position.x;
      const dy = this.circles[i].getPosition().y - position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const totalRadius = this.circles[i].getRadius() + radius;
      if (dist <= totalRadius) {
        (position.x = getRandomRangeNumber(
          radius * 2,
          CANVAS_WIDTH - radius * 2
        )),
          (position.y = getRandomRangeNumber(
            radius * 2,
            CANVAS_HEIGHT - radius * 2
          )),
          (i = 0);
      }
    }

    const velocity: Vector = {
      x: getRandomRangeNumber(MIN_BALL_SPEED, MAX_BALL_SPEED),
      y: getRandomRangeNumber(MIN_BALL_SPEED, MAX_BALL_SPEED),
    };
    const angle: number = Math.random() * 360;
    this.circles.push(new Circle(position, radius, velocity, angle));
  };

  circleCollision = () => {
    for (let i = 0; i < this.circles.length; i++) {
      for (let j = i + 1; j < this.circles.length; j++) {
        this.circles[i].collision(this.circles[j]);
      }
    }
  };

  fixedUpdate = () => {
    this.frameRequestHandle = window.requestAnimationFrame(this.fixedUpdate);

    // 델타 타임
    const curTime = Date.now();
    this.delta = (curTime - this.startTime) * 0.001;
    this.startTime = curTime;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.circleCollision();
    this.circles.forEach((circle) => {
      circle.update(this.delta);
      circle.render(this.ctx);
    });
  };
}
window.onload = () => {
  new App();
};
