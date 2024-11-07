from django.contrib import admin
from .models import Sujeto, Establecimiento, InspeccionSanitaria, Multa

@admin.register(Sujeto)
class SujetoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'domicilio', 'fecha_nacimiento', 'tarjeta_control_sanitario', 'tarjeta_numero')
    search_fields = ('nombre', 'domicilio')
    list_filter = ('tarjeta_control_sanitario', 'fecha_nacimiento')
    ordering = ('nombre',)
    fieldsets = (
        (None, {
            'fields': (
                'nombre',
                'domicilio',
                'fecha_nacimiento',
                'fotografia',
                'estado_salud',
                'tarjeta_control_sanitario',
                'tarjeta_numero'
            )
        }),
    )

@admin.register(Establecimiento)
class EstablecimientoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'direccion', 'aviso_funcionamiento', 'sujeto_responsable')
    search_fields = ('nombre', 'direccion')
    list_filter = ('aviso_funcionamiento',)
    ordering = ('nombre',)
    raw_id_fields = ('sujeto_responsable',)  # Usa un campo de búsqueda para ForeignKey

@admin.register(InspeccionSanitaria)
class InspeccionSanitariaAdmin(admin.ModelAdmin):
    list_display = ('sujeto', 'fecha_inspeccion', 'resultado_inspeccion', 'inspector')
    search_fields = ('sujeto__nombre', 'inspector')
    list_filter = ('fecha_inspeccion',)
    ordering = ('-fecha_inspeccion',)  # Ordenar por fecha descendente
    raw_id_fields = ('sujeto',)  # Usa un campo de búsqueda para ForeignKey

@admin.register(Multa)
class MultaAdmin(admin.ModelAdmin):
    list_display = ('sujeto', 'monto', 'motivo', 'fecha_multa', 'pagada')
    search_fields = ('sujeto__nombre', 'motivo')
    list_filter = ('pagada', 'fecha_multa')
    ordering = ('-fecha_multa',)  # Ordenar por fecha descendente
    raw_id_fields = ('sujeto',)  # Usa un campo de búsqueda para ForeignKey