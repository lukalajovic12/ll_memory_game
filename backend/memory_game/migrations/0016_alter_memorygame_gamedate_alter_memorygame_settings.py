# Generated by Django 4.2.5 on 2024-02-25 19:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('memory_game', '0015_alter_memorygame_gamedate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='memorygame',
            name='gameDate',
            field=models.DateField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='memorygame',
            name='settings',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='memory_game.gamesettings'),
        ),
    ]
