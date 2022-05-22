import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getObject(): any {
    return {
      id: 1,
      nome: "Saulo Castro",
    };
  }
}
