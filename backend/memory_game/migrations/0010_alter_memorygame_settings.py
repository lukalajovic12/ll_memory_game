# Generated by Django 4.2.5 on 2024-02-02 18:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('memory_game', '0009_gamesettings_timeincrease_alter_gamesettings_lives_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='memorygame',
            name='settings',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='memory_game.gamesettings'),
        ),
    ]
