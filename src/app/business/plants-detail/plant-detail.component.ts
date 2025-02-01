import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Plant, Summary } from '../../core/models/model';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
    selector: 'app-plant-detail',
    standalone: true,
    templateUrl: './plant-detail.component.html',
    styleUrls: ['./plant-detail.component.css'],
    imports: [CommonModule],
})
export class PlantDetailComponent implements OnChanges {
    @Input() plant: Plant | null = null; // Datos de la planta seleccionada
    @Input() flagUrl: string | null = null; // URL de la bandera
    @Input() summary: Summary | null = null; // Datos del summary para la planta

    summaryCards = [
        { label: 'Temperatura', value: 0, unit: '°C' },
        { label: 'Presión', value: 0, unit: 'hPa' },
        { label: 'Viento', value: 0, unit: 'km/h' },
        { label: 'Niveles', value: 0, unit: '%' },
        { label: 'Energía', value: 0, unit: 'kWh' },
        { label: 'Tensión', value: 0, unit: 'V' },
        { label: 'CO2', value: 0, unit: 'ppm' },
        { label: 'Gases', value: 0, unit: 'ppm' },
    ];

    ngOnChanges(changes: SimpleChanges): void {
        if (this.summary) {
            this.summaryCards = [
                { label: 'Lecturas OK', value: this.summary.readingsOk || 0, unit: '' },
                { label: 'Alertas Medias', value: this.summary.mediumAlerts || 0, unit: '' },
                { label: 'Alertas Rojas', value: this.summary.redAlerts || 0, unit: '' },
                { label: 'Sensores Inactivos', value: this.summary.disabledSensors || 0, unit: '' }
            ];
        }
    }
}
