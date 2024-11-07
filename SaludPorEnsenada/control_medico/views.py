from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import (
    Sujeto, Establecimiento, InspeccionSanitaria, Multa,
    Event, Contact, File, Process,
    Paciente, Consulta, HistorialMedico, Prescripcion,
    SexoServidora, Inspector, MultaTarjeta, CentroNocturno
)
from .serializers import (
    SujetoSerializer, EstablecimientoSerializer, InspeccionSanitariaSerializer, MultaSerializer,
    EventSerializer, ContactSerializer, FileSerializer, ProcessSerializer,
    PacienteSerializer, ConsultaSerializer, HistorialMedicoSerializer, PrescripcionSerializer,
    SexoServidoraSerializer, InspectorSerializer, MultaSerializerTarjeta, CentroNocturnoSerializer
)
from django.contrib.auth.models import User


# Vistas para modelos administrativos

class SujetoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Sujeto.objects.all()
    serializer_class = SujetoSerializer

class EstablecimientoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Establecimiento.objects.all()
    serializer_class = EstablecimientoSerializer

class InspeccionSanitariaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = InspeccionSanitaria.objects.all()
    serializer_class = InspeccionSanitariaSerializer

class MultaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Multa.objects.all()
    serializer_class = MultaSerializer


# Registro de usuarios
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    user.save()

    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)


# Vista personalizada para crear multas
@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def crear_multa(request):
    serializer = MultaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def mis_multas(request):
    usuario = request.user
    multas = Multa.objects.filter(usuario=usuario)
    serializer = MultaSerializer(multas, many=True)
    return Response(serializer.data)


# Vistas para modelos logísticos

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer

class ProcessViewSet(viewsets.ModelViewSet):
    queryset = Process.objects.all()
    serializer_class = ProcessSerializer


# Vistas para modelos de consultas médicas

class PacienteViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticated]
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

class ConsultaViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticated]
    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer

class HistorialMedicoViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticated]
    queryset = HistorialMedico.objects.all()
    serializer_class = HistorialMedicoSerializer

class PrescripcionViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticated]
    queryset = Prescripcion.objects.all()
    serializer_class = PrescripcionSerializer


#vistas para contros nocturnos
class SexoServidoraViewSet(viewsets.ModelViewSet):
    queryset = SexoServidora.objects.all()
    serializer_class = SexoServidoraSerializer
    #permission_classes = [IsAuthenticated]

class InspectorViewSet(viewsets.ModelViewSet):
    queryset = Inspector.objects.all()
    serializer_class = InspectorSerializer
    #permission_classes = [IsAuthenticated]

class MultaTarjetaViewSet(viewsets.ModelViewSet):
    queryset = MultaTarjeta.objects.all()
    serializer_class = MultaSerializerTarjeta
    #permission_classes = [IsAuthenticated]

class CentroNocturnoViewSet(viewsets.ModelViewSet):
    queryset = CentroNocturno.objects.all()
    serializer_class = CentroNocturnoSerializer
    #permission_classes = [IsAuthenticated]
