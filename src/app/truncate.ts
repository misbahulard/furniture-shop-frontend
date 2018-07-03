import { Pipe } from '@angular/core'

@Pipe({
  name: 'truncate'
})

export class TruncatePipe {
  transform(value: string, len: number, trailChar: string) : string {
    let limit = len > 0 ? len : 10;
    let trail = trailChar ? trailChar : '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
