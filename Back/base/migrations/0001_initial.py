# Generated by Django 4.2 on 2023-04-17 17:39

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prod', models.CharField(max_length=50, unique=True)),
                ('category', models.CharField(max_length=50, unique=True)),
                ('desc', models.CharField(max_length=50, unique=True)),
                ('price', models.DecimalField(decimal_places=2, default=1, max_digits=4, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10000)])),
                ('createdTime', models.DateTimeField(auto_now=True)),
                ('productImage', models.CharField(default='/placeholder.png', max_length=50, unique=True)),
            ],
        ),
    ]
