# Generated by Django 3.0.8 on 2020-12-03 04:23

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20201202_0528'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='date',
            field=models.DateTimeField(blank=True, null=True, verbose_name=datetime.datetime(2020, 12, 3, 4, 23, 18, 21381, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='comment',
            name='replys',
            field=models.ManyToManyField(blank=True, to='main.Reply'),
        ),
        migrations.AlterField(
            model_name='discussionmember',
            name='date_joined',
            field=models.DateField(blank=True, null=True, verbose_name=datetime.datetime(2020, 12, 3, 4, 23, 18, 23401, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='reply',
            name='date',
            field=models.DateTimeField(blank=True, null=True, verbose_name=datetime.datetime(2020, 12, 3, 4, 23, 18, 20978, tzinfo=utc)),
        ),
    ]
