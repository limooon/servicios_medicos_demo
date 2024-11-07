from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Sujeto(models.Model):
    nombre = models.CharField(max_length=255)
    domicilio = models.CharField(max_length=255)
    fecha_nacimiento = models.DateField()
    fotografia = models.ImageField(upload_to='sujetos/fotos/')
    estado_salud = models.TextField(blank=True)  # Para resumir el estado de salud según el Art. 63
    tarjeta_control_sanitario = models.BooleanField(default=False)
    tarjeta_numero = models.CharField(max_length=100, null=True, blank=True)
    
    def __str__(self):
        return self.nombre

class Establecimiento(models.Model):
    nombre = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    aviso_funcionamiento = models.BooleanField(default=False)
    sujeto_responsable = models.ForeignKey(Sujeto, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nombre

class InspeccionSanitaria(models.Model):
    sujeto = models.ForeignKey(Sujeto, on_delete=models.CASCADE)
    fecha_inspeccion = models.DateField()
    resultado_inspeccion = models.TextField()  # Detalles de la inspección
    testigos = models.TextField()  # Almacenar los nombres de los testigos según Art. 77
    inspector = models.CharField(max_length=255)

    def __str__(self):
        return f"Inspección de {self.sujeto.nombre} - {self.fecha_inspeccion}"
    
class Multa(models.Model):
    sujeto = models.ForeignKey(Sujeto, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    motivo = models.TextField()  # Razón de la multa
    fecha_multa = models.DateField(auto_now_add=True)
    pagada = models.BooleanField(default=False)
    detalles_articulo = models.TextField()  # Artículos aplicados para la sanción

    def __str__(self):
        return f"Multa para {self.sujeto.nombre} - {self.fecha_multa}"
    

#logistica modelos
class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    location = models.CharField(max_length=255)
    invitados = models.CharField(max_length=255)
    requerimientos = models.CharField(max_length=255)
    ficha_tecnica = models.FileField(upload_to='uploads/')
    officios = models.FileField(upload_to='uploads/')

    def __str__(self):
        return f'{self.name} - {self.start_date} - {self.end_date}'

class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    dependencia = models.CharField(max_length=255)
    cargo = models.CharField(max_length=255)
    
    def __str__(self):
        return f'{self.name} - {self.email} - {self.phone} - {self.cargo}'

class File(models.Model):
    name = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Process(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    description = models.TextField()
    status = models.CharField(max_length=50)


#modelos de consultas medicas

# Paciente y su información personal y médica.
class Paciente(models.Model):
    nombre = models.CharField(max_length=255)
    domicilio = models.CharField(max_length=255)
    fecha_nacimiento = models.DateField()
    fotografia = models.ImageField(upload_to='pacientes/fotos/', blank=True, null=True)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    estado_salud = models.TextField(blank=True)  # Estado de salud general
    fecha_registro = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.nombre

# Información sobre las consultas médicas
class Consulta(models.Model):
    TIPO_CONSULTA_CHOICES = [
        ('general', 'Médica General'),
        ('nutricional', 'Nutricional'),
        ('psicologica', 'Psicológica')
    ]
    
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='consultas')
    tipo_consulta = models.CharField(max_length=20, choices=TIPO_CONSULTA_CHOICES)
    fecha_consulta = models.DateTimeField(default=timezone.now)
    motivo_consulta = models.TextField()  # Descripción del malestar o motivo de la visita
    recomendaciones = models.TextField(blank=True, null=True)  # Recomendaciones generales

    def __str__(self):
        return f"{self.tipo_consulta} - {self.paciente.nombre} - {self.fecha_consulta}"

# Historial médico del paciente, contiene diagnósticos previos y otros detalles relevantes
class HistorialMedico(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='historiales')
    consulta = models.OneToOneField(Consulta, on_delete=models.CASCADE, related_name='historial')
    diagnostico = models.TextField()
    tratamiento = models.TextField(blank=True, null=True)  # Tratamiento indicado para la consulta
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Historial de {self.paciente.nombre} - {self.fecha_registro}"

# Medicación recomendada en función de los diagnósticos realizados durante las consultas
class Prescripcion(models.Model):
    historial_medico = models.ForeignKey(HistorialMedico, on_delete=models.CASCADE, related_name='prescripciones')
    medicamento = models.CharField(max_length=255)
    dosis = models.CharField(max_length=100)  # Cantidad y frecuencia
    instrucciones = models.TextField(blank=True, null=True)  # Instrucciones de uso
    fecha_prescripcion = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.medicamento} para {self.historial_medico.paciente.nombre}"
    


#modelos de gestion de multas para tarjeta dijital y centros nocturnos
class CentroNocturno(models.Model):
    nombre = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)
    correo_electronico = models.EmailField()
    aviso_funcionamiento = models.BooleanField(default=False)
    responsable = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre

class SexoServidora(models.Model):
    nombre = models.CharField(max_length=255)
    apellidos_paterno = models.CharField(max_length=255,default='')
    apellidos_materno = models.CharField(max_length=255,default='')
    domicilio = models.CharField(max_length=255)
    fotografia = models.ImageField(upload_to='sexo_servidoras/fotos/')
    fecha_nacimiento = models.DateField()
    fotografia = models.ImageField(upload_to='sexo_servidoras/fotos/')
    estado_tarjeta = models.CharField(max_length=100, choices=[('Vigente', 'Vigente'), ('Vencida', 'Vencida')])
    descripcion_medica_actual = models.TextField(blank=True, null=True)
    historial_pagos = models.TextField(blank=True, null=True)  # ajustar con modelo de pagos
    tarjeta_digital_qr = models.ImageField(upload_to='sexo_servidoras/qr/', blank=True, null=True)

    def __str__(self):
        return self.nombre
    
    def get_fotografia_url(self):
        if self.fotografia:
            return self.fotografia.url
        return None

class Inspector(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)
    #agregar numero de empleado tipo de empleado,telefono del empleado - conectar api de wasap


    def __str__(self):
        return self.nombre
    
class MultaTarjeta(models.Model):
    sexo_servidora = models.ForeignKey(SexoServidora, on_delete=models.CASCADE, related_name='multas')
    centro_nocturno = models.ForeignKey(CentroNocturno, on_delete=models.CASCADE, related_name='multas', null=True)
    fecha_multa = models.DateTimeField(auto_now_add=True)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    motivo = models.TextField()#mejor un chebox con los datos de primer vencimiento, segundo etc
    pagada = models.BooleanField(default=False)
    #falta obtener qr y el nombre  del modelo de sexoservidora y falta de centro nocturno obtener el nombre y telefono
    
    def __str__(self):
        return f'Multa para {self.sexo_servidora.nombre} - {self.fecha_multa}'
