# Generated by Django 4.2.5 on 2024-02-26 20:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('memory_game', '0018_alter_memorygame_gamedate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='memorygame',
            name='gameDate',
            field=models.DateTimeField(),
        ),
    ]
