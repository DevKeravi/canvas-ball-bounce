import { CANVAS_HEIGHT, CANVAS_WIDTH } from './index';
import Shape from './shape';
import Vector from './vector';

const PI2 = Math.PI * 2;
export default class Circle extends Shape {
  private radius: number;
  private velocity: Vector;
  private angle: number;

  constructor(
    position: Vector,
    radius: number,
    velocity: Vector,
    angle: number
  ) {
    super(position);
    this.radius = radius;
    this.velocity = {
      x: Math.cos(angle) * velocity.x,
      y: Math.sin(angle) * velocity.y,
    };
    this.angle = angle;
  }

  getVelocity(): Vector {
    return this.velocity;
  }
  setVelocity(velocity: Vector): void {
    this.velocity = velocity;
  }

  getPosition(): Vector {
    return this.position;
  }

  setPosition(position: Vector): void {
    this.position = position;
  }
  getRadius(): number {
    return this.radius;
  }

  collision(other: Circle) {
    const dx = other.getPosition().x - this.position.x;
    const dy = other.getPosition().y - this.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const totalRadius = this.radius + other.getRadius();
    if (dist < totalRadius) {
      const angle = Math.atan2(dy, dx);
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      const vx1 = this.velocity.x * cos + this.velocity.y * sin;
      const vy1 = this.velocity.y * cos - this.velocity.x * sin;

      const vx2 = other.getVelocity().x * cos + other.getVelocity().y * sin;
      const vy2 = other.getVelocity().y * cos - other.getVelocity().x * sin;

      this.velocity = {
        x: vx2 * cos - vy1 * sin,
        y: vy1 * cos + vx2 * sin,
      };
      other.setVelocity({
        x: vx1 * cos - vy2 * sin,
        y: vy2 * cos + vx1 * sin,
      });
    }
  }

  update(delta: number) {
    const velocity: Vector = {
      x: this.velocity.x * delta,
      y: this.velocity.y * delta,
    };

    this.position.x += velocity.x;
    this.position.y += velocity.y;
    this.bounceWindow();
  }

  render(context: CanvasRenderingContext2D) {
    context.fillStyle = 'skyblue';
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, PI2);
    context.fill();
  }

  bounceWindow() {
    const minX = this.radius;
    const maxX = CANVAS_WIDTH - this.radius;
    const minY = this.radius;
    const maxY = CANVAS_HEIGHT - this.radius;

    if (this.position.x <= minX || this.position.x >= maxX) {
      this.velocity.x *= -1;
      this.position.x = this.position.x <= this.radius ? this.radius : maxX;
    }
    if (this.position.y <= minY || this.position.y >= maxY) {
      this.velocity.y *= -1;
      this.position.y = this.position.y <= this.radius ? this.radius : maxY;
    }
  }
}
