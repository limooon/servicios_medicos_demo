# Generated by Django 5.1.2 on 2024-11-07 06:07

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('control_medico', '0004_alter_consulta_fecha_consulta'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CentroNocturno',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
                ('direccion', models.CharField(max_length=255)),
                ('telefono', models.CharField(max_length=20)),
                ('correo_electronico', models.EmailField(max_length=254)),
                ('aviso_funcionamiento', models.BooleanField(default=False)),
                ('responsable', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='SexoServidora',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
                ('domicilio', models.CharField(max_length=255)),
                ('fecha_nacimiento', models.DateField()),
                ('fotografia', models.ImageField(upload_to='sexo_servidoras/fotos/')),
                ('estado_tarjeta', models.CharField(choices=[('Vigente', 'Vigente'), ('Vencida', 'Vencida')], max_length=100)),
                ('descripcion_medica_actual', models.TextField(blank=True, null=True)),
                ('historial_pagos', models.TextField(blank=True, null=True)),
                ('tarjeta_digital_qr', models.ImageField(blank=True, null=True, upload_to='sexo_servidoras/qr/')),
            ],
        ),
        migrations.CreateModel(
            name='Inspector',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MultaTarjeta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_multa', models.DateTimeField(auto_now_add=True)),
                ('monto', models.DecimalField(decimal_places=2, max_digits=10)),
                ('motivo', models.TextField()),
                ('pagada', models.BooleanField(default=False)),
                ('centro_nocturno', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='multas', to='control_medico.centronocturno')),
                ('sexo_servidora', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='multas', to='control_medico.sexoservidora')),
            ],
        ),
    ]
