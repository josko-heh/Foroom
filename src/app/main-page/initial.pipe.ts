import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'initialPipe' })
export class InitialPipe implements PipeTransform {

  transform(name: string): string {
    if (!name || name.length==0) 
        return "";

    return name.charAt(0).toUpperCase();
  }

}
