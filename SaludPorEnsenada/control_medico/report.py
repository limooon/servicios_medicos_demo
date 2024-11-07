from reportlab.pdfgen import canvas
from django.http import HttpResponse
from .models import Multa

def generar_pdf_multa(request, multa_id):
    multa = Multa.objects.get(id=multa_id)
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="multa_{multa.id}.pdf"'

    p = canvas.Canvas(response)
    p.drawString(100, 750, f"Multa #{multa.id}")
    p.drawString(100, 730, f"Tipo de Multa: {multa.tipo_multa}")
    p.drawString(100, 710, f"Monto: ${multa.monto}")
    p.drawString(100, 690, f"Descripción: {multa.descripcion}")
    p.drawString(100, 670, f"Fecha: {multa.fecha_emision}")
    
    p.showPage()
    p.save()

    return response