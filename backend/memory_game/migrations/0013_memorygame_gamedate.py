# Generated by Django 4.2.5 on 2024-02-25 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('memory_game', '0012_alter_memorygame_settings'),
    ]

    operations = [
        migrations.AddField(
            model_name='memorygame',
            name='gameDate',
            field=models.DateField(default=None),
        ),
    ]
