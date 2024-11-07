from rest_framework import serializers
from .models import (
    Sujeto, Establecimiento, InspeccionSanitaria,Multa,
    Event, Contact, File, Process,
    Paciente, Consulta, HistorialMedico, Prescripcion,
    SexoServidora, Inspector, MultaTarjeta, CentroNocturno
)


class MultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Multa
        fields = '__all__'

    def validate_monto(self, value):
        if value < 0:
            raise serializers.ValidationError("El monto de la multa no puede ser negativo.")
        return value
        
class SujetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sujeto
        fields = '__all__'

class EstablecimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establecimiento
        fields = '__all__'

class InspeccionSanitariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = InspeccionSanitaria
        fields = '__all__'


# Serializadores de logística
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'

class ProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Process
        fields = '__all__'


# Serializadores para consultas médicas
class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'

class ConsultaSerializer(serializers.ModelSerializer):
    paciente_nombre = serializers.CharField(source='paciente.nombre', read_only=True)

    class Meta:
        model = Consulta
        fields = '__all__'

class HistorialMedicoSerializer(serializers.ModelSerializer):
    paciente_nombre = serializers.CharField(source='paciente.nombre', read_only=True)
    consulta_tipo = serializers.CharField(source='consulta.tipo_consulta', read_only=True)

    class Meta:
        model = HistorialMedico
        fields = '__all__'

class PrescripcionSerializer(serializers.ModelSerializer):
    paciente_nombre = serializers.CharField(source='historial_medico.paciente.nombre', read_only=True)
    diagnostico = serializers.CharField(source='historial_medico.diagnostico', read_only=True)

    class Meta:
        model = Prescripcion
        fields = '__all__'


#Serializadores para el control de centros nocturnos
class SexoServidoraSerializer(serializers.ModelSerializer):
    class Meta:
        model = SexoServidora
        fields = '__all__'

class InspectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inspector
        fields = '__all__'

class MultaSerializerTarjeta(serializers.ModelSerializer):
    class Meta:
        model = MultaTarjeta
        fields = '__all__'

class CentroNocturnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CentroNocturno
        fields = '__all__'