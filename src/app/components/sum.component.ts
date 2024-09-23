import {ChangeDetectionStrategy, Component, Inject, inject, Input} from "@angular/core";
import {LoggerService} from "../services/logger.service";
import {APP_CONFIG} from "../app.config";

// Stateless
@Component({
  selector: 'app-sum',
  standalone: true,
  template: `
    {{ a + b }}
    <h1></h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SumComponent {

  private logger = inject(LoggerService);
  private config = inject(APP_CONFIG);

  @Input({ required: true }) a!: number;
  @Input({ required: true }) b!: number;

  ngOnInit() {
    this.logger.log(this.config.apiUrl);
  }
}
