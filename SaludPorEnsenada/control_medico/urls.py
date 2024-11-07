from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    SujetoViewSet, EventViewSet, ContactViewSet, FileViewSet, ProcessViewSet,
    EstablecimientoViewSet, InspeccionSanitariaViewSet, MultaViewSet, register,
    PacienteViewSet, ConsultaViewSet, HistorialMedicoViewSet, PrescripcionViewSet,
     SexoServidoraViewSet,InspectorViewSet,MultaTarjetaViewSet,CentroNocturnoViewSet
)

router = DefaultRouter()
router.register(r'sujetos', SujetoViewSet)
router.register(r'establecimientos', EstablecimientoViewSet)
router.register(r'inspecciones', InspeccionSanitariaViewSet)
router.register(r'multas', MultaViewSet)
router.register(r'events', EventViewSet)
router.register(r'contacts', ContactViewSet)
router.register(r'files', FileViewSet)
router.register(r'processes', ProcessViewSet)

# Rutas para consultas médicas
router.register(r'pacientes', PacienteViewSet)
router.register(r'consultas', ConsultaViewSet)
router.register(r'historiales-medicos', HistorialMedicoViewSet)
router.register(r'prescripciones', PrescripcionViewSet)

#rutas para centros nocturnos multas
router.register(r'sexo-servidoras', SexoServidoraViewSet)
router.register(r'centros-nocturnos', CentroNocturnoViewSet)
router.register(r'inspectores', InspectorViewSet)
router.register(r'multas-tarjeta', MultaTarjetaViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', register, name='register'),

    # Rutas de clases para los procesos de logística
    path('api/events/', EventViewSet.as_view({'get': 'list', 'post': 'create'}), name='event-list-create'),
    path('api/events/<int:pk>/', EventViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='event-detail'),
    
    path('api/contacts/', ContactViewSet.as_view({'get': 'list', 'post': 'create'}), name='contact-list-create'),
    path('api/contacts/<int:pk>/', ContactViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='contact-detail'),
    
    path('api/files/', FileViewSet.as_view({'get': 'list', 'post': 'create'}), name='file-list-create'),
    path('api/files/<int:pk>/', FileViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='file-detail'),
    
    path('api/processes/', ProcessViewSet.as_view({'get': 'list', 'post': 'create'}), name='process-list-create'),
    path('api/processes/<int:pk>/', ProcessViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='process-detail'),

    # Rutas específicas para CRUD de consultas médicas
    path('api/pacientes/', PacienteViewSet.as_view({'get': 'list', 'post': 'create'}), name='paciente-list-create'),
    path('api/pacientes/<int:pk>/', PacienteViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='paciente-detail'),

    path('api/consultas/', ConsultaViewSet.as_view({'get': 'list', 'post': 'create'}), name='consulta-list-create'),
    path('api/consultas/<int:pk>/', ConsultaViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='consulta-detail'),

    path('api/historiales-medicos/', HistorialMedicoViewSet.as_view({'get': 'list', 'post': 'create'}), name='historialmedico-list-create'),
    path('api/historiales-medicos/<int:pk>/', HistorialMedicoViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='historialmedico-detail'),

    path('api/prescripciones/', PrescripcionViewSet.as_view({'get': 'list', 'post': 'create'}), name='prescripcion-list-create'),
    path('api/prescripciones/<int:pk>/', PrescripcionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='prescripcion-detail'),

    #rutas para centros nocturnos multas
    path('api/sexo-servidoras/', SexoServidoraViewSet.as_view({'get': 'list', 'post': 'create'}), name='sexoservidora-list-create'),
    path('api/sexo-servidoras/<int:pk>/', SexoServidoraViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='sexoservidora-detail'),

    path('api/centros-nocturnos/', CentroNocturnoViewSet.as_view({'get': 'list', 'post': 'create'}), name='centronocturno-list-create'),
    path('api/centros-nocturnos/<int:pk>/', CentroNocturnoViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='centronocturno-detail'),

    path('api/multas-tarjeta/', MultaTarjetaViewSet.as_view({'get': 'list', 'post': 'create'}), name='multatarjeta-list-create'),
    path('api/multas-tarjeta/<int:pk>/', MultaTarjetaViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='multatarjeta-detail'),

   path('api/inspectores/', InspectorViewSet.as_view({'get': 'list', 'post': 'create'}), name='multacentro-list-create'),
   path('api/inspectores/<int:pk>/', InspectorViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='inspectores-detail'),
]
